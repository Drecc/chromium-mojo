# Copyright 2022 The Chromium Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.
"""create_js_source_maps presubmit script.

See http://dev.chromium.org/developers/how-tos/depottools/presubmit-scripts for
details on the presubmit API built into gcl.
"""
USE_PYTHON3 = True
PRESUBMIT_VERSION = '2.0.0'


def CheckLint(input_api, output_api):
  results = input_api.canned_checks.RunPylint(input_api, output_api)
  results += input_api.canned_checks.CheckPatchFormatted(input_api,
                                                         output_api,
                                                         check_js=True)
  try:
    import sys
    old_sys_path = sys.path[:]
    cwd = input_api.PresubmitLocalPath()
    sys.path += [input_api.os_path.join(cwd, '..', '..')]
    from web_dev_style import presubmit_support
    results += presubmit_support.CheckStyleESLint(input_api, output_api)
  finally:
    sys.path = old_sys_path
  return results


def CheckUnittests(input_api, output_api):
  results = input_api.canned_checks.RunUnitTests(
      input_api,
      output_api, [
          input_api.os_path.join(input_api.PresubmitLocalPath(), 'test',
                                 'create_js_source_maps_test.py')
      ],
      run_on_python2=False)
  return results
