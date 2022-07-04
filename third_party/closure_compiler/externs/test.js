// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This file was generated by:
//   tools/json_schema_compiler/compiler.py.
// NOTE: The format of types has changed. 'FooType' is now
//   'chrome.test.FooType'.
// Please run the closure compiler before committing changes.
// See https://chromium.googlesource.com/chromium/src/+/master/docs/closure_compilation.md

/** @fileoverview Externs generated from namespace: test */

/** @const */
chrome.test = {};

/**
 * Gives configuration options set by the test.
 * @param {function({
 *   customArg: (string|undefined),
 *   ftpServer: ({
 *     port: number
 *   }|undefined),
 *   testServer: ({
 *     port: number
 *   }|undefined),
 *   testDataDirectory: (string|undefined),
 *   testWebSocketPort: (number|undefined),
 *   loginStatus: ({
 *     isLoggedIn: (boolean|undefined),
 *     isScreenLocked: (boolean|undefined)
 *   }|undefined)
 * }): void} callback
 * @see https://developer.chrome.com/extensions/test#method-getConfig
 */
chrome.test.getConfig = function(callback) {};

/**
 * Notifies the browser process that test code running in the extension failed.
 * This is only used for internal unit testing.
 * @param {string} message
 * @see https://developer.chrome.com/extensions/test#method-notifyFail
 */
chrome.test.notifyFail = function(message) {};

/**
 * Notifies the browser process that test code running in the extension passed.
 * This is only used for internal unit testing.
 * @param {string=} message
 * @see https://developer.chrome.com/extensions/test#method-notifyPass
 */
chrome.test.notifyPass = function(message) {};

/**
 * Logs a message during internal unit testing.
 * @param {string} message
 * @see https://developer.chrome.com/extensions/test#method-log
 */
chrome.test.log = function(message) {};

/**
 * Sends a string message to the browser process, generating a Notification that
 * C++ test code can wait for.
 * @param {string} message
 * @param {function(string): void=} callback
 * @see https://developer.chrome.com/extensions/test#method-sendMessage
 */
chrome.test.sendMessage = function(message, callback) {};

/**
 * @see https://developer.chrome.com/extensions/test#method-callbackAdded
 */
chrome.test.callbackAdded = function() {};

/**
 * @see https://developer.chrome.com/extensions/test#method-runNextTest
 */
chrome.test.runNextTest = function() {};

/**
 * @param {*=} message
 * @see https://developer.chrome.com/extensions/test#method-fail
 */
chrome.test.fail = function(message) {};

/**
 * @param {*=} message
 * @see https://developer.chrome.com/extensions/test#method-succeed
 */
chrome.test.succeed = function(message) {};

/**
 * Returns an instance of the module system for the given context.
 * @param {*} context
 * @return {*} The module system
 * @see https://developer.chrome.com/extensions/test#method-getModuleSystem
 */
chrome.test.getModuleSystem = function(context) {};

/**
 * @param {(string|boolean)} test
 * @param {string=} message
 * @see https://developer.chrome.com/extensions/test#method-assertTrue
 */
chrome.test.assertTrue = function(test, message) {};

/**
 * @param {(string|boolean)} test
 * @param {string=} message
 * @see https://developer.chrome.com/extensions/test#method-assertFalse
 */
chrome.test.assertFalse = function(test, message) {};

/**
 * @param {(string|boolean)} test
 * @param {boolean} expected
 * @param {string=} message
 * @see https://developer.chrome.com/extensions/test#method-assertBool
 */
chrome.test.assertBool = function(test, expected, message) {};

/**
 * @param {*=} expected
 * @param {*=} actual
 * @see https://developer.chrome.com/extensions/test#method-checkDeepEq
 */
chrome.test.checkDeepEq = function(expected, actual) {};

/**
 * @param {*=} expected
 * @param {*=} actual
 * @param {string=} message
 * @see https://developer.chrome.com/extensions/test#method-assertEq
 */
chrome.test.assertEq = function(expected, actual, message) {};

/**
 * @see https://developer.chrome.com/extensions/test#method-assertNoLastError
 */
chrome.test.assertNoLastError = function() {};

/**
 * @param {string} expectedError
 * @see https://developer.chrome.com/extensions/test#method-assertLastError
 */
chrome.test.assertLastError = function(expectedError) {};

/**
 * @param {function(): void} fn
 * @param {?Object|undefined} self
 * @param {!Array<*>} args
 * @param {(string|RegExp)=} message
 * @see https://developer.chrome.com/extensions/test#method-assertThrows
 */
chrome.test.assertThrows = function(fn, self, args, message) {};

/**
 * @param {function(): void=} func
 * @param {string=} expectedError
 * @see https://developer.chrome.com/extensions/test#method-callback
 */
chrome.test.callback = function(func, expectedError) {};

/**
 * @param {*} event
 * @param {function(): void} func
 * @see https://developer.chrome.com/extensions/test#method-listenOnce
 */
chrome.test.listenOnce = function(event, func) {};

/**
 * @param {*} event
 * @param {function(): void} func
 * @see https://developer.chrome.com/extensions/test#method-listenForever
 */
chrome.test.listenForever = function(event, func) {};

/**
 * @param {function(): void=} func
 * @see https://developer.chrome.com/extensions/test#method-callbackPass
 */
chrome.test.callbackPass = function(func) {};

/**
 * @param {string} expectedError
 * @param {function(): void=} func
 * @see https://developer.chrome.com/extensions/test#method-callbackFail
 */
chrome.test.callbackFail = function(expectedError, func) {};

/**
 * @param {!Array<function(): void>} tests
 * @see https://developer.chrome.com/extensions/test#method-runTests
 */
chrome.test.runTests = function(tests) {};

/**
 * @see https://developer.chrome.com/extensions/test#method-getApiFeatures
 */
chrome.test.getApiFeatures = function() {};

/**
 * @param {!Array<string>=} apiNames
 * @see https://developer.chrome.com/extensions/test#method-getApiDefinitions
 */
chrome.test.getApiDefinitions = function(apiNames) {};

/**
 * @see https://developer.chrome.com/extensions/test#method-isProcessingUserGesture
 */
chrome.test.isProcessingUserGesture = function() {};

/**
 * Runs the callback in the context of a user gesture.
 * @param {function(): void} callback
 * @see https://developer.chrome.com/extensions/test#method-runWithUserGesture
 */
chrome.test.runWithUserGesture = function(callback) {};

/**
 * Sends a string message one round trip from the renderer to the browser
 * process and back.
 * @param {string} message
 * @param {function(string): void} callback
 * @see https://developer.chrome.com/extensions/test#method-waitForRoundTrip
 */
chrome.test.waitForRoundTrip = function(message, callback) {};

/**
 * Sets the function to be called when an exception occurs. By default this is a
 * function which fails the test. This is reset for every test run through
 * $ref:test.runTests.
 * @param {function(string, *): void} callback
 * @see https://developer.chrome.com/extensions/test#method-setExceptionHandler
 */
chrome.test.setExceptionHandler = function(callback) {};

/**
 * Returns the wake-event-page API function, which can be called to wake up the
 * extension's event page.
 * @return {function(): void} The API function which wakes the extension's event
 *     page
 * @see https://developer.chrome.com/extensions/test#method-getWakeEventPage
 */
chrome.test.getWakeEventPage = function() {};

/**
 * Used to test sending messages to extensions.
 * @type {!ChromeEvent}
 * @see https://developer.chrome.com/extensions/test#event-onMessage
 */
chrome.test.onMessage;
