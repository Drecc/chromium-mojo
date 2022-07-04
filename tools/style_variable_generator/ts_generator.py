# Copyright 2021 The Chromium Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

from style_variable_generator.css_generator import CSSStyleGenerator


class TSStyleGenerator(CSSStyleGenerator):
    '''Generator for TS Variables'''

    @staticmethod
    def GetName():
        return 'TS'

    def Render(self):
        self.Validate()
        return self.ApplyTemplate(self, 'ts_generator.tmpl',
                                  self.GetParameters())

    def GetParameters(self):
        params = CSSStyleGenerator.GetParameters(self)
        params['include_style_sheet'] = self.generator_options.get(
            'include_style_sheet', 'false') == 'true'
        return params

    def GetFilters(self):
        filters = CSSStyleGenerator.GetFilters(self)
        filters['to_ts_var_name'] = self.ToTSVarName
        return filters

    def ToTSVarName(self, model_name):
        return model_name.upper()
