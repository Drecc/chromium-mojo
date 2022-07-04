# Copyright 2017 The Chromium Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.
"""Logic for diffing two SizeInfo objects. See: ./docs/diffs.md"""

import collections
import itertools
import logging
import re

import models


_STRIP_NUMBERS_PATTERN = re.compile(r'[.0-9]+$|\$\d+')
_NORMALIZE_STAR_SYMBOLS_PATTERN = re.compile(r'\s+\d+( \(.*\))?$')


# Matches symbols that are unchanged (will generally be the majority).
# Matching by size is important for string literals, which all have the same
# name, but which one addition would shift their order.
def _Key1(s):
  # Remove non-stable numbers from symbols names. E.g.:
  # * Names that are generated by macros and that use __line__ in them.
  # * Toolchain-generated names that have .# suffixes. e.g.: ".L.ref.tmp.2".
  # * Java anonymous symbols. e.g. SingleCategoryPreferences$3#this$0
  name = _STRIP_NUMBERS_PATTERN.sub('', s.full_name)
  # Prefer source_path over object_path since object_path for native files have
  # the target_name in it (which can get renamed).
  # Also because object_path of Java lambdas symbols contains a hash.
  path = s.source_path or s.object_path
  # Use section rather than section_name since clang & gcc use
  # .data.rel.ro vs. .data.rel.ro.local.
  return s.container_name, s.section, name, path, s.size_without_padding


# Same as _Key1, but size can change.
def _Key2(s):
  return _Key1(s)[:4]


# Same as _Key2, but allow signature changes (uses name rather than full_name).
def _Key3(s):
  path = s.source_path or s.object_path
  name = _STRIP_NUMBERS_PATTERN.sub('', s.name)
  clone_idx = name.find(' [clone ')
  if clone_idx != -1:
    name = name[:clone_idx]
  if name.startswith('*'):
    # "* symbol gap 3 (bar)" -> "* symbol gaps"
    name = _NORMALIZE_STAR_SYMBOLS_PATTERN.sub('s', name)
  return s.container_name, s.section, name, path


# Match on full name, but without path (to account for file moves).
def _Key4(s):
  if not s.IsNameUnique():
    return None
  return s.container_name, s.section, s.full_name


def _MatchSymbols(before, after, key_func, padding_by_segment):
  logging.debug('%s: Building symbol index', key_func.__name__)
  before_symbols_by_key = collections.defaultdict(list)
  for s in before:
    before_symbols_by_key[key_func(s)].append(s)

  logging.debug('%s: Creating delta symbols', key_func.__name__)
  unmatched_after = []
  delta_symbols = []
  for after_sym in after:
    key = key_func(after_sym)
    before_sym = key and before_symbols_by_key.get(key)
    if before_sym:
      before_sym = before_sym.pop(0)
      # Padding tracked in aggregate, except for padding-only symbols.
      if before_sym.size_without_padding != 0:
        segment = (before_sym.container_name, before_sym.section_name)
        padding_by_segment[segment] += (after_sym.padding_pss -
                                        before_sym.padding_pss)
      delta_symbols.append(models.DeltaSymbol(before_sym, after_sym))
    else:
      unmatched_after.append(after_sym)

  logging.debug('%s: Matched %d of %d symbols', key_func.__name__,
                len(delta_symbols), len(after))

  unmatched_before = []
  for syms in before_symbols_by_key.values():
    unmatched_before.extend(syms)
  return delta_symbols, unmatched_before, unmatched_after


def _DiffSymbolGroups(containers, before, after):
  # For changed symbols, padding is zeroed out. In order to not lose the
  # information entirely, store it in aggregate. These aggregations are grouped
  # by "segment names", which are (container name, section name) tuples.
  padding_by_segment = collections.defaultdict(float)

  # Usually >90% of symbols are exact matches, so all of the time is spent in
  # this first pass.
  all_deltas, before, after = _MatchSymbols(before, after, _Key1,
                                            padding_by_segment)
  for key_func in (_Key2, _Key3, _Key4):
    delta_syms, before, after = _MatchSymbols(before, after, key_func,
                                              padding_by_segment)
    all_deltas.extend(delta_syms)

  logging.debug('Creating %d unmatched symbols', len(after) + len(before))
  for after_sym in after:
    all_deltas.append(models.DeltaSymbol(None, after_sym))
  for before_sym in before:
    all_deltas.append(models.DeltaSymbol(before_sym, None))

  container_from_name = {c.name: c for c in containers}

  # Create a DeltaSymbol to represent the zero'd out padding of matched symbols.
  for (container_name, section_name), padding in padding_by_segment.items():
    # Values need to be integer (crbug.com/1132394).
    padding = round(padding)
    if padding != 0:
      after_sym = models.Symbol(section_name, padding)
      after_sym.container = container_from_name[container_name]
      # This is after _NormalizeNames() is called, so set |full_name|,
      # |template_name|, and |name|.
      after_sym.SetName("Overhead: aggregate padding of diff'ed symbols")
      after_sym.padding = padding
      all_deltas.append(models.DeltaSymbol(None, after_sym))

  return models.DeltaSymbolGroup(all_deltas)


def _DiffContainerLists(before_containers, after_containers):
  """Computes diff of Containers lists, matching names."""
  # Find ordered unique names, preferring order of |container_after|.
  pairs = collections.OrderedDict()
  for c in after_containers:
    pairs[c.name] = [models.Container.Empty(), c]
  for c in before_containers:
    if c.name in pairs:
      pairs[c.name][0] = c
    else:
      pairs[c.name] = [c, models.Container.Empty()]
  ret = []
  for name, (before, after) in pairs.items():
    ret.append(models.DeltaContainer(name=name, before=before, after=after))
  # This update newly created diff Containers, not existing ones or EMPTY.
  models.BaseContainer.AssignShortNames(ret)
  return ret


def Diff(before, after, sort=False):
  """Diffs two SizeInfo objects. Returns a DeltaSizeInfo.

  See docs/diffs.md for diffing algorithm.
  """
  assert isinstance(before, models.SizeInfo)
  assert isinstance(after, models.SizeInfo)
  containers_diff = _DiffContainerLists(before.containers, after.containers)
  symbol_diff = _DiffSymbolGroups(containers_diff, before.raw_symbols,
                                  after.raw_symbols)
  ret = models.DeltaSizeInfo(before, after, containers_diff, symbol_diff)

  if sort:
    syms = ret.symbols  # Triggers clustering.
    logging.debug('Grouping')
    # Group path aliases so that functions defined in headers will be sorted
    # by their actual size rather than shown as many small symbols.
    # Grouping these is nice since adding or remove just one path alias changes
    # the PSS of all symbols (a lot of noise).
    syms = syms.GroupedByAliases(same_name_only=True)
    logging.debug('Sorting')
    ret.symbols = syms.Sorted()
  logging.debug('Diff complete')
  return ret
