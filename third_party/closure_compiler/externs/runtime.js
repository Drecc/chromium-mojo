// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This file was generated by:
//   tools/json_schema_compiler/compiler.py.
// NOTE: The format of types has changed. 'FooType' is now
//   'chrome.runtime.FooType'.
// Please run the closure compiler before committing changes.
// See https://chromium.googlesource.com/chromium/src/+/main/docs/closure_compilation.md

// IMPORTANT NOTE: Work-around for crbug.com/543822
// s/chrome.runtime.tabs.Tab/chrome.tabs.Tab/

/** @fileoverview Externs generated from namespace: runtime */

/** @const */
chrome.runtime = {};

/**
 * An object which allows two way communication with other pages. See <a href="messaging#connect">Long-lived connections</a> for more information.
 * @constructor
 * @private
 * @see https://developer.chrome.com/extensions/runtime#type-Port
 */
chrome.runtime.Port = function() {};

/**
 * The name of the port, as specified in the call to $(ref:runtime.connect).
 * @type {string}
 * @see https://developer.chrome.com/extensions/runtime#type-name
 */
chrome.runtime.Port.prototype.name;

/**
 * Immediately disconnect the port. Calling <code>disconnect()</code> on an
 * already-disconnected port has no effect. When a port is disconnected, no new
 * events will be dispatched to this port.
 * @see https://developer.chrome.com/extensions/runtime#method-disconnect
 */
chrome.runtime.Port.prototype.disconnect = function() {};

/**
 * Send a message to the other end of the port. If the port is disconnected, an
 * error is thrown.
 * @param {*} message The message to send. This object should be JSON-ifiable.
 * @see https://developer.chrome.com/extensions/runtime#method-postMessage
 */
chrome.runtime.Port.prototype.postMessage = function(message) {};

/**
 * This property will <b>only</b> be present on ports passed to $(ref:runtime.onConnect onConnect) / $(ref:runtime.onConnectExternal onConnectExternal) / $(ref:runtime.onConnectExternal onConnectNative) listeners.
 * @type {(!chrome.runtime.MessageSender|undefined)}
 * @see https://developer.chrome.com/extensions/runtime#type-sender
 */
chrome.runtime.Port.prototype.sender;


/**
 * An object containing information about the script context that sent a message or request.
 * @typedef {{
 *   tab: (!chrome.tabs.Tab|undefined),
 *   frameId: (number|undefined),
 *   guestProcessId: (number|undefined),
 *   guestRenderFrameRoutingId: (number|undefined),
 *   id: (string|undefined),
 *   url: (string|undefined),
 *   nativeApplication: (string|undefined),
 *   tlsChannelId: (string|undefined),
 *   origin: (string|undefined)
 * }}
 * @see https://developer.chrome.com/extensions/runtime#type-MessageSender
 */
chrome.runtime.MessageSender;

/**
 * @enum {string}
 * @see https://developer.chrome.com/extensions/runtime#type-PlatformOs
 */
chrome.runtime.PlatformOs = {
  MAC: 'mac',
  WIN: 'win',
  ANDROID: 'android',
  CROS: 'cros',
  LINUX: 'linux',
  OPENBSD: 'openbsd',
};

/**
 * @enum {string}
 * @see https://developer.chrome.com/extensions/runtime#type-PlatformArch
 */
chrome.runtime.PlatformArch = {
  ARM: 'arm',
  ARM64: 'arm64',
  X86_32: 'x86-32',
  X86_64: 'x86-64',
  MIPS: 'mips',
  MIPS64: 'mips64',
};

/**
 * @enum {string}
 * @see https://developer.chrome.com/extensions/runtime#type-PlatformNaclArch
 */
chrome.runtime.PlatformNaclArch = {
  ARM: 'arm',
  X86_32: 'x86-32',
  X86_64: 'x86-64',
  MIPS: 'mips',
  MIPS64: 'mips64',
};

/**
 * An object containing information about the current platform.
 * @typedef {{
 *   os: !chrome.runtime.PlatformOs,
 *   arch: !chrome.runtime.PlatformArch,
 *   nacl_arch: !chrome.runtime.PlatformNaclArch
 * }}
 * @see https://developer.chrome.com/extensions/runtime#type-PlatformInfo
 */
chrome.runtime.PlatformInfo;

/**
 * @enum {string}
 * @see https://developer.chrome.com/extensions/runtime#type-RequestUpdateCheckStatus
 */
chrome.runtime.RequestUpdateCheckStatus = {
  THROTTLED: 'throttled',
  NO_UPDATE: 'no_update',
  UPDATE_AVAILABLE: 'update_available',
};

/**
 * @enum {string}
 * @see https://developer.chrome.com/extensions/runtime#type-OnInstalledReason
 */
chrome.runtime.OnInstalledReason = {
  INSTALL: 'install',
  UPDATE: 'update',
  CHROME_UPDATE: 'chrome_update',
  SHARED_MODULE_UPDATE: 'shared_module_update',
};

/**
 * @enum {string}
 * @see https://developer.chrome.com/extensions/runtime#type-OnRestartRequiredReason
 */
chrome.runtime.OnRestartRequiredReason = {
  APP_UPDATE: 'app_update',
  OS_UPDATE: 'os_update',
  PERIODIC: 'periodic',
};

/**
 * This will be defined during an API method callback if there was an error
 * @typedef {{
 *   message: (string|undefined)
 * }}
 * @see https://developer.chrome.com/extensions/runtime#type-lastError
 */
chrome.runtime.lastError;

/**
 * The ID of the extension/app.
 * @type {string}
 * @see https://developer.chrome.com/extensions/runtime#type-id
 */
chrome.runtime.id;

/**
 * Retrieves the JavaScript 'window' object for the background page running
 * inside the current extension/app. If the background page is an event page,
 * the system will ensure it is loaded before calling the callback. If there is
 * no background page, an error is set.
 * @param {function((Window|undefined)): void} callback
 * @see https://developer.chrome.com/extensions/runtime#method-getBackgroundPage
 */
chrome.runtime.getBackgroundPage = function(callback) {};

/**
 * <p>Open your Extension's options page, if possible.</p><p>The precise
 * behavior may depend on your manifest's <code><a
 * href="optionsV2">options_ui</a></code> or <code><a
 * href="options">options_page</a></code> key, or what Chrome happens to support
 * at the time. For example, the page may be opened in a new tab, within
 * chrome://extensions, within an App, or it may just focus an open options
 * page. It will never cause the caller page to reload.</p><p>If your Extension
 * does not declare an options page, or Chrome failed to create one for some
 * other reason, the callback will set $(ref:lastError).</p>
 * @param {function(): void=} callback
 * @see https://developer.chrome.com/extensions/runtime#method-openOptionsPage
 */
chrome.runtime.openOptionsPage = function(callback) {};

/**
 * Returns details about the app or extension from the manifest. The object
 * returned is a serialization of the full <a href="manifest.html">manifest
 * file</a>.
 * @return {Object} The manifest details.
 * @see https://developer.chrome.com/extensions/runtime#method-getManifest
 */
chrome.runtime.getManifest = function() {};

/**
 * Converts a relative path within an app/extension install directory to a
 * fully-qualified URL.
 * @param {string} path A path to a resource within an app/extension expressed
 *     relative to its install directory.
 * @return {string} The fully-qualified URL to the resource.
 * @see https://developer.chrome.com/extensions/runtime#method-getURL
 */
chrome.runtime.getURL = function(path) {};

/**
 * Sets the URL to be visited upon uninstallation. This may be used to clean up
 * server-side data, do analytics, and implement surveys. Maximum 255
 * characters.
 * @param {string} url URL to be opened after the extension is uninstalled. This
 *     URL must have an http: or https: scheme. Set an empty string to not open
 *     a new tab upon uninstallation.
 * @param {function(): void=} callback Called when the uninstall URL is set. If
 *     the given URL is invalid, $(ref:runtime.lastError) will be set.
 * @see https://developer.chrome.com/extensions/runtime#method-setUninstallURL
 */
chrome.runtime.setUninstallURL = function(url, callback) {};

/**
 * Reloads the app or extension. This method is not supported in kiosk mode. For
 * kiosk mode, use chrome.runtime.restart() method.
 * @see https://developer.chrome.com/extensions/runtime#method-reload
 */
chrome.runtime.reload = function() {};

/**
 * <p>Requests an immediate update check be done for this app/extension.</p>
 * <p><b>Important</b>: Most extensions/apps should <b>not</b> use this method,
 * since Chrome already does automatic checks every few hours, and you can
 * listen for the $(ref:runtime.onUpdateAvailable) event without needing to call
 * requestUpdateCheck.</p><p>This method is only appropriate to call in very
 * limited circumstances, such as if your extension/app talks to a backend
 * service, and the backend service has determined that the client extension/app
 * version is very far out of date and you'd like to prompt a user to update.
 * Most other uses of requestUpdateCheck, such as calling it unconditionally
 * based on a repeating timer, probably only serve to waste client, network, and
 * server resources.</p>
 * @param {function(!chrome.runtime.RequestUpdateCheckStatus, ({
 *   version: string
 * }|undefined)): void} callback
 * @see https://developer.chrome.com/extensions/runtime#method-requestUpdateCheck
 */
chrome.runtime.requestUpdateCheck = function(callback) {};

/**
 * Restart the ChromeOS device when the app runs in kiosk mode. Otherwise, it's
 * no-op.
 * @see https://developer.chrome.com/extensions/runtime#method-restart
 */
chrome.runtime.restart = function() {};

/**
 * Restart the ChromeOS device when the app runs in kiosk mode after the given
 * seconds. If called again before the time ends, the reboot will be delayed. If
 * called with a value of -1, the reboot will be cancelled. It's a no-op in
 * non-kiosk mode. It's only allowed to be called repeatedly by the first
 * extension to invoke this API.
 * @param {number} seconds Time to wait in seconds before rebooting the device,
 *     or -1 to cancel a scheduled reboot.
 * @param {function(): void=} callback A callback to be invoked when a restart
 *     request was successfully rescheduled.
 * @see https://developer.chrome.com/extensions/runtime#method-restartAfterDelay
 */
chrome.runtime.restartAfterDelay = function(seconds, callback) {};

/**
 * Attempts to connect to connect listeners within an extension/app (such as the
 * background page), or other extensions/apps. This is useful for content
 * scripts connecting to their extension processes, inter-app/extension
 * communication, and <a href="manifest/externally_connectable.html">web
 * messaging</a>. Note that this does not connect to any listeners in a content
 * script. Extensions may connect to content scripts embedded in tabs via
 * $(ref:tabs.connect).
 * @param {string=} extensionId The ID of the extension or app to connect to. If
 *     omitted, a connection will be attempted with your own extension. Required
 *     if sending messages from a web page for <a
 *     href="manifest/externally_connectable.html">web messaging</a>.
 * @param {{
 *   name: (string|undefined),
 *   includeTlsChannelId: (boolean|undefined)
 * }=} connectInfo
 * @return {!chrome.runtime.Port} Port through which messages can be sent and
 *     received. The port's $(ref:Port onDisconnect) event is fired if the
 *     extension/app does not exist.
 * @see https://developer.chrome.com/extensions/runtime#method-connect
 */
chrome.runtime.connect = function(extensionId, connectInfo) {};

/**
 * Connects to a native application in the host machine. See <a
 * href="nativeMessaging">Native Messaging</a> for more information.
 * @param {string} application The name of the registered application to connect
 *     to.
 * @return {!chrome.runtime.Port} Port through which messages can be sent and
 *     received with the application
 * @see https://developer.chrome.com/extensions/runtime#method-connectNative
 */
chrome.runtime.connectNative = function(application) {};

/**
 * Sends a single message to event listeners within your extension/app or a
 * different extension/app. Similar to $(ref:runtime.connect) but only sends a
 * single message, with an optional response. If sending to your extension, the
 * $(ref:runtime.onMessage) event will be fired in every frame of your extension
 * (except for the sender's frame), or $(ref:runtime.onMessageExternal), if a
 * different extension. Note that extensions cannot send messages to content
 * scripts using this method. To send messages to content scripts, use
 * $(ref:tabs.sendMessage).
 * @param {?string|undefined} extensionId The ID of the extension/app to send
 *     the message to. If omitted, the message will be sent to your own
 *     extension/app. Required if sending messages from a web page for <a
 *     href="manifest/externally_connectable.html">web messaging</a>.
 * @param {*} message The message to send. This message should be a JSON-ifiable
 *     object.
 * @param {{
 *   includeTlsChannelId: (boolean|undefined)
 * }=} options
 * @param {function(*): void=} responseCallback
 * @see https://developer.chrome.com/extensions/runtime#method-sendMessage
 */
chrome.runtime.sendMessage = function(extensionId, message, options, responseCallback) {};

/**
 * Send a single message to a native application.
 * @param {string} application The name of the native messaging host.
 * @param {Object} message The message that will be passed to the native
 *     messaging host.
 * @param {function(*): void=} responseCallback
 * @see https://developer.chrome.com/extensions/runtime#method-sendNativeMessage
 */
chrome.runtime.sendNativeMessage = function(application, message, responseCallback) {};

/**
 * Returns information about the current platform.
 * @param {function(!chrome.runtime.PlatformInfo): void} callback Called with
 *     results
 * @see https://developer.chrome.com/extensions/runtime#method-getPlatformInfo
 */
chrome.runtime.getPlatformInfo = function(callback) {};

/**
 * Returns a DirectoryEntry for the package directory.
 * @param {function(DirectoryEntry): void} callback
 * @see https://developer.chrome.com/extensions/runtime#method-getPackageDirectoryEntry
 */
chrome.runtime.getPackageDirectoryEntry = function(callback) {};

/**
 * Fired when a profile that has this extension installed first starts up. This
 * event is not fired when an incognito profile is started, even if this
 * extension is operating in 'split' incognito mode.
 * @type {!ChromeEvent}
 * @see https://developer.chrome.com/extensions/runtime#event-onStartup
 */
chrome.runtime.onStartup;

/**
 * Fired when the extension is first installed, when the extension is updated to
 * a new version, and when Chrome is updated to a new version.
 * @type {!ChromeEvent}
 * @see https://developer.chrome.com/extensions/runtime#event-onInstalled
 */
chrome.runtime.onInstalled;

/**
 * Sent to the event page just before it is unloaded. This gives the extension
 * opportunity to do some clean up. Note that since the page is unloading, any
 * asynchronous operations started while handling this event are not guaranteed
 * to complete. If more activity for the event page occurs before it gets
 * unloaded the onSuspendCanceled event will be sent and the page won't be
 * unloaded.
 * @type {!ChromeEvent}
 * @see https://developer.chrome.com/extensions/runtime#event-onSuspend
 */
chrome.runtime.onSuspend;

/**
 * Sent after onSuspend to indicate that the app won't be unloaded after all.
 * @type {!ChromeEvent}
 * @see https://developer.chrome.com/extensions/runtime#event-onSuspendCanceled
 */
chrome.runtime.onSuspendCanceled;

/**
 * Fired when an update is available, but isn't installed immediately because
 * the app is currently running. If you do nothing, the update will be installed
 * the next time the background page gets unloaded, if you want it to be
 * installed sooner you can explicitly call chrome.runtime.reload(). If your
 * extension is using a persistent background page, the background page of
 * course never gets unloaded, so unless you call chrome.runtime.reload()
 * manually in response to this event the update will not get installed until
 * the next time Chrome itself restarts. If no handlers are listening for this
 * event, and your extension has a persistent background page, it behaves as if
 * chrome.runtime.reload() is called in response to this event.
 * @type {!ChromeEvent}
 * @see https://developer.chrome.com/extensions/runtime#event-onUpdateAvailable
 */
chrome.runtime.onUpdateAvailable;

/**
 * Fired when a Chrome update is available, but isn't installed immediately
 * because a browser restart is required.
 * @type {!ChromeEvent}
 * @see https://developer.chrome.com/extensions/runtime#event-onBrowserUpdateAvailable
 */
chrome.runtime.onBrowserUpdateAvailable;

/**
 * Fired when a connection is made from either an extension process or a content
 * script (by $(ref:runtime.connect)).
 * @type {!ChromeEvent}
 * @see https://developer.chrome.com/extensions/runtime#event-onConnect
 */
chrome.runtime.onConnect;

/**
 * Fired when a connection is made from another extension (by
 * $(ref:runtime.connect)).
 * @type {!ChromeEvent}
 * @see https://developer.chrome.com/extensions/runtime#event-onConnectExternal
 */
chrome.runtime.onConnectExternal;

/**
 * Fired when a connection is made from a native application. Currently only
 * supported on Chrome OS.
 * @type {!ChromeEvent}
 * @see https://developer.chrome.com/extensions/runtime#event-onConnectNative
 */
chrome.runtime.onConnectNative;

/**
 * Fired when a message is sent from either an extension process (by
 * $(ref:runtime.sendMessage)) or a content script (by $(ref:tabs.sendMessage)).
 * @type {!ChromeEvent}
 * @see https://developer.chrome.com/extensions/runtime#event-onMessage
 */
chrome.runtime.onMessage;

/**
 * Fired when a message is sent from another extension/app (by
 * $(ref:runtime.sendMessage)). Cannot be used in a content script.
 * @type {!ChromeEvent}
 * @see https://developer.chrome.com/extensions/runtime#event-onMessageExternal
 */
chrome.runtime.onMessageExternal;

/**
 * Fired when an app or the device that it runs on needs to be restarted. The
 * app should close all its windows at its earliest convenient time to let the
 * restart to happen. If the app does nothing, a restart will be enforced after
 * a 24-hour grace period has passed. Currently, this event is only fired for
 * Chrome OS kiosk apps.
 * @type {!ChromeEvent}
 * @see https://developer.chrome.com/extensions/runtime#event-onRestartRequired
 */
chrome.runtime.onRestartRequired;