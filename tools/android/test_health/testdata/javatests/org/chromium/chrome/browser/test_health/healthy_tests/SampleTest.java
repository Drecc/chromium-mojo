// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package org.chromium.chrome.browser.test_health.healthy_tests;

import androidx.test.filters.SmallTest;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.chromium.base.test.BaseJUnit4ClassRunner;

/** A sample Java test. */
@SmallTest
@RunWith(BaseJUnit4ClassRunner.class)
public class SampleTest {
    @Test
    public void testTrueIsTrue() {
        Assert.assertTrue(true);
    }
}
