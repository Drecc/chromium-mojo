// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "base/win/default_apps_util.h"

#include <shobjidl.h>
#include <wrl/client.h>

#include "base/logging.h"
#include "base/strings/strcat.h"
#include "base/strings/string_util.h"
#include "base/win/windows_version.h"

namespace {

// Returns the target used as a activate parameter when opening the settings
// pointing to the page that is the most relevant to a user trying to change the
// default handler for `protocol`.
std::wstring GetTargetForDefaultAppsSettings(base::WStringPiece protocol) {
  static constexpr base::WStringPiece kSystemSettingsDefaultAppsPrefix(
      L"SystemSettings_DefaultApps_");
  if (base::EqualsCaseInsensitiveASCII(protocol, L"http"))
    return base::StrCat({kSystemSettingsDefaultAppsPrefix, L"Browser"});
  if (base::EqualsCaseInsensitiveASCII(protocol, L"mailto"))
    return base::StrCat({kSystemSettingsDefaultAppsPrefix, L"Email"});
  return L"SettingsPageAppsDefaultsProtocolView";
}

}  // namespace

namespace base::win {

bool CanLaunchDefaultAppsSettingsModernDialog() {
  return GetVersion() >= Version::WIN8;
}

bool LaunchDefaultAppsSettingsModernDialog(base::WStringPiece protocol) {
  // The appModelId looks arbitrary but it is the same in Win8 and Win10. There
  // is no easy way to retrieve the appModelId from the registry.
  static constexpr wchar_t kControlPanelAppModelId[] =
      L"windows.immersivecontrolpanel_cw5n1h2txyewy"
      L"!microsoft.windows.immersivecontrolpanel";

  if (!CanLaunchDefaultAppsSettingsModernDialog())
    return false;

  Microsoft::WRL::ComPtr<IApplicationActivationManager> activator;
  HRESULT hr = ::CoCreateInstance(CLSID_ApplicationActivationManager, nullptr,
                                  CLSCTX_ALL, IID_PPV_ARGS(&activator));
  if (FAILED(hr))
    return false;

  DWORD pid = 0;
  CoAllowSetForegroundWindow(activator.Get(), nullptr);
  hr = activator->ActivateApplication(
      kControlPanelAppModelId, L"page=SettingsPageAppsDefaults", AO_NONE, &pid);
  if (FAILED(hr))
    return false;
  if (protocol.empty())
    return true;

  hr = activator->ActivateApplication(
      kControlPanelAppModelId,
      base::StrCat({L"page=SettingsPageAppsDefaults&target=",
                    GetTargetForDefaultAppsSettings(protocol)})
          .c_str(),
      AO_NONE, &pid);
  return SUCCEEDED(hr);
}

}  // namespace base::win
