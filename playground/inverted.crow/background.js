// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
 Displays a notification with the current time. Requires "notifications"
 permission in the manifest file (or calling
 "webkitNotifications.requestPermission" beforehand).
 */
function show() {
    var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
    var hour = time[1] % 12 || 12;               // The prettyprinted hour.
    var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
    var notification = window.webkitNotifications.createNotification(
        '',                      // The image.
        hour + time[2] + ' ' + period, // The title.
        localStorage.getItem("myVal")     // The body.
    );
    notification.show();
}

<<<<<<< HEAD
// Conditionally initialize the options.
if (!localStorage.isInitialized) {
    localStorage.isActivated = true;   // The display activation.
    localStorage.frequency = 1;        // The display frequency, in minutes.
    localStorage.isInitialized = true; // The option initialization.
=======
function actionClicked(tab) {
	chrome.debugger.attach({tabId:tab.id}, version, onAttach.bind(null, tab.id));
>>>>>>> popup-test(editet)
}

// Test for notification support.
if (window.webkitNotifications) {
    // While activated, show notifications at the display frequency.
    if (JSON.parse(localStorage.isActivated)) { show(); }

    var interval = 0; // The display interval, in minutes.

    setInterval(function() {
        interval++;

<<<<<<< HEAD
        if (
            JSON.parse(localStorage.isActivated) &&
                localStorage.frequency <= interval
            ) {
            show();
            interval = 0;
        }
    }, 60000);
=======
	chrome.windows.create(
		{url: "browser_action.html?" + tabId, type: "popup", width: 300, height: 300});

>>>>>>> popup-test(editet)
}
