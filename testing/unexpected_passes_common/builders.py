# Copyright 2020 The Chromium Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.
"""Methods related to querying builder information from Buildbucket."""

from __future__ import print_function

import json
import logging
import os
import subprocess

import six

from unexpected_passes_common import constants
from unexpected_passes_common import data_types
from unexpected_passes_common import multiprocessing_utils

TESTING_BUILDBOT_DIR = os.path.realpath(
    os.path.join(os.path.dirname(__file__), '..', 'buildbot'))
INTERNAL_TESTING_BUILDBOT_DIR = os.path.realpath(
    os.path.join(constants.SRC_INTERNAL_DIR, 'testing', 'buildbot'))

AUTOGENERATED_JSON_KEY = 'AAAAA1 AUTOGENERATED FILE DO NOT EDIT'

_registered_instance = None

# pylint: disable=useless-object-inheritance


def GetInstance():
  return _registered_instance


def RegisterInstance(instance):
  global _registered_instance
  assert _registered_instance is None
  assert isinstance(instance, Builders)
  _registered_instance = instance


def ClearInstance():
  global _registered_instance
  _registered_instance = None


class Builders(object):
  def __init__(self, include_internal_builders):
    self._authenticated = False
    self._include_internal_builders = include_internal_builders

  def GetCiBuilders(self, suite):
    """Gets the set of CI builders to query.

    Args:
      suite: A string containing particular suite of interest if applicable,
          such as for Telemetry-based tests. Can be None if not applicable.

    Returns:
      A set of data_types.BuilderEntry, each element corresponding to either a
      public or internal CI builder to query results from.
    """
    ci_builders = set()

    def ProcessJsonFiles(files, are_internal_files):
      for filepath in files:
        if not filepath.endswith('.json'):
          continue
        with open(filepath) as f:
          buildbot_json = json.load(f)
        # Skip any JSON files that don't contain builder information.
        if AUTOGENERATED_JSON_KEY not in buildbot_json:
          continue

        for builder, test_map in buildbot_json.items():
          # Remove the auto-generated comments.
          if 'AAAA' in builder:
            continue
          # Filter out any builders that don't run the suite in question.
          if not self._BuilderRunsTestOfInterest(test_map, suite):
            continue
          ci_builders.add(
              data_types.BuilderEntry(builder, constants.BuilderTypes.CI,
                                      are_internal_files))

    logging.info('Getting CI builders')
    ProcessJsonFiles([
        os.path.join(TESTING_BUILDBOT_DIR, f)
        for f in os.listdir(TESTING_BUILDBOT_DIR)
    ], False)
    if self._include_internal_builders:
      ProcessJsonFiles([
          os.path.join(INTERNAL_TESTING_BUILDBOT_DIR, f)
          for f in os.listdir(INTERNAL_TESTING_BUILDBOT_DIR)
      ], True)

    logging.debug('Got %d CI builders after trimming: %s', len(ci_builders),
                  ', '.join([b.name for b in ci_builders]))
    return ci_builders

  def _BuilderRunsTestOfInterest(self, test_map, suite):
    """Determines if a builder runs a test of interest.

    Args:
      test_map: A dict, corresponding to a builder's test spec from a
          //testing/buildbot JSON file.
      suite: A string containing particular suite of interest if applicable,
          such as for Telemetry-based tests. Can be None if not applicable.

    Returns:
      True if |test_map| contains a test of interest, else False.
    """
    raise NotImplementedError()

  def GetTryBuilders(self, ci_builders):
    """Gets the set of try builders to query.

    A try builder is of interest if it mirrors a builder in |ci_builders|.

    Args:
      ci_builders: An iterable of data_types.BuilderEntry, each element being a
          public or internal CI builder that results will be/were queried from.

    Returns:
      A set of strings, each element being the name of a Chromium try builder to
      query results from.
    """
    logging.info('Getting try builders')
    mirrored_builders = set()
    no_output_builders = set()

    pool = multiprocessing_utils.GetProcessPool()
    results = pool.map(self._GetMirroredBuildersForCiBuilder, ci_builders)
    for (builders, found_mirror) in results:
      if found_mirror:
        mirrored_builders |= builders
      else:
        no_output_builders |= builders

    if no_output_builders:
      raise RuntimeError(
          'Did not get Buildbucket output for the following builders. They may '
          'need to be added to the GetFakeCiBuilders or '
          'GetNonChromiumBuilders .\n%s' % '\n'.join(no_output_builders))
    logging.debug('Got %d try builders: %s', len(mirrored_builders),
                  mirrored_builders)
    return mirrored_builders

  def _GetMirroredBuildersForCiBuilder(self, ci_builder):
    """Gets the set of try builders that mirror a CI builder.

    Args:
      ci_builder: A data_types.BuilderEntry for a public or internal CI builder.

    Returns:
      A tuple (builders, found_mirror). |builders| is a set of strings, either
      the set of try builders that mirror |ci_builder| or |ci_builder|,
      depending on the value of |found_mirror|. |found_mirror| is True if
      mirrors were actually found, in which case |builders| contains the try
      builders. Otherwise, |found_mirror| is False and |builders| contains
      |ci_builder|.
    """
    mirrored_builders = set()
    if ci_builder in self.GetNonChromiumBuilders():
      logging.debug('%s is a non-Chromium CI builder', ci_builder.name)
      return mirrored_builders, True

    fake_builders = self.GetFakeCiBuilders()
    if ci_builder in fake_builders:
      mirrored_builders |= fake_builders[ci_builder]
      logging.debug('%s is a fake CI builder mirrored by %s', ci_builder.name,
                    ', '.join(b.name for b in fake_builders[ci_builder]))
      return mirrored_builders, True

    bb_output = self._GetBuildbucketOutputForCiBuilder(ci_builder)
    if not bb_output:
      mirrored_builders.add(ci_builder)
      logging.debug('Did not get Buildbucket output for builder %s',
                    ci_builder.name)
      return mirrored_builders, False

    bb_json = json.loads(bb_output)
    mirrored = bb_json.get('output', {}).get('properties',
                                             {}).get('mirrored_builders', [])
    # The mirror names from Buildbucket include the group separated by :, e.g.
    # tryserver.chromium.android:gpu-fyi-try-android-m-nexus-5x-64, so only grab
    # the builder name.
    for mirror in mirrored:
      split = mirror.split(':')
      assert len(split) == 2
      logging.debug('Got mirrored builder for %s: %s', ci_builder.name,
                    split[1])
      mirrored_builders.add(
          data_types.BuilderEntry(split[1], constants.BuilderTypes.TRY,
                                  ci_builder.is_internal_builder))
    return mirrored_builders, True

  def _GetBuildbucketOutputForCiBuilder(self, ci_builder):
    # Ensure the user is logged in to bb.
    if not self._authenticated:
      try:
        with open(os.devnull, 'w') as devnull:
          subprocess.check_call(['bb', 'auth-info'],
                                stdout=devnull,
                                stderr=devnull)
      except subprocess.CalledProcessError as e:
        six.raise_from(
            RuntimeError('You are not logged into bb - run `bb auth-login`.'),
            e)
      self._authenticated = True
    # Split out for ease of testing.
    # Get the Buildbucket ID for the most recent completed build for a builder.
    p = subprocess.Popen([
        'bb',
        'ls',
        '-id',
        '-1',
        '-status',
        'ended',
        '%s/ci/%s' % (ci_builder.project, ci_builder.name),
    ],
                         stdout=subprocess.PIPE)
    # Use the ID to get the most recent build.
    bb_output = subprocess.check_output([
        'bb',
        'get',
        '-A',
        '-json',
    ],
                                        stdin=p.stdout)
    return bb_output

  def GetIsolateNames(self):
    """Gets the isolate names that are relevant to this implementation.

    Returns:
      A set of strings, each element being the name of an isolate of interest.
    """
    raise NotImplementedError()

  def GetFakeCiBuilders(self):
    """Gets a mapping of fake CI builders to their mirrored trybots.

    Returns:
      A dict of string -> set(string). Each key is a CI builder that doesn't
      actually exist and each value is a set of try builders that mirror the CI
      builder but do exist.
    """
    raise NotImplementedError()

  def GetNonChromiumBuilders(self):
    """Gets the builders that are not actual Chromium builders.

    These are listed in the Chromium //testing/buildbot files, but aren't under
    the Chromium Buildbucket project. These don't use the same recipes as
    Chromium builders, and thus don't have the list of trybot mirrors.

    Returns:
      A set of strings, each element being the name of a non-Chromium builder.
    """
    raise NotImplementedError()
