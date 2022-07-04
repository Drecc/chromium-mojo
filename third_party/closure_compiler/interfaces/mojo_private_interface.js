// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This file was generated by:
//   ./tools/json_schema_compiler/compiler.py.

/** @fileoverview Interface for mojoPrivate that can be overriden. */

/** @interface */
function MojoPrivate() {}

MojoPrivate.prototype = {
  /**
   * Returns a promise that will resolve to an asynchronously loaded module.
   * @param {string} name
   * @return {*}
   */
  requireAsync: function(name) {},
};
