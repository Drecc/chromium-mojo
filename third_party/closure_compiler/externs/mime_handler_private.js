// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This file was generated by:
//   tools/json_schema_compiler/compiler.py.
// NOTE: The format of types has changed. 'FooType' is now
//   'chrome.mimeHandlerPrivate.FooType'.
// Please run the closure compiler before committing changes.
// See https://chromium.googlesource.com/chromium/src/+/main/docs/closure_compilation.md

/** @fileoverview Externs generated from namespace: mimeHandlerPrivate */

/** @const */
chrome.mimeHandlerPrivate = {};

/**
 * @typedef {{
 *   mimeType: string,
 *   originalUrl: string,
 *   streamUrl: string,
 *   tabId: number,
 *   responseHeaders: Object,
 *   embedded: boolean
 * }}
 */
chrome.mimeHandlerPrivate.StreamInfo;

/**
 * @typedef {{
 *   backgroundColor: number,
 *   allowJavascript: boolean
 * }}
 */
chrome.mimeHandlerPrivate.PdfPluginAttributes;

/**
 * Returns the StreamInfo for the stream for this context if there is one.
 * @param {function(!chrome.mimeHandlerPrivate.StreamInfo): void} callback
 */
chrome.mimeHandlerPrivate.getStreamInfo = function(callback) {};

/**
 * Sets PDF plugin attributes in the stream for this context if there is one.
 * @param {!chrome.mimeHandlerPrivate.PdfPluginAttributes} pdfPluginAttributes
 */
chrome.mimeHandlerPrivate.setPdfPluginAttributes = function(pdfPluginAttributes) {};

/**
 * Instructs the PluginDocument, if running in one, to show a dialog in response
 * to beforeunload events.
 * @param {boolean} showDialog
 * @param {function(): void=} callback
 */
chrome.mimeHandlerPrivate.setShowBeforeUnloadDialog = function(showDialog, callback) {};

/**
 * Fired when the browser wants the listener to perform a save.
 * @type {!ChromeEvent}
 */
chrome.mimeHandlerPrivate.onSave;
