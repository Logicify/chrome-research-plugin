// Copyright (c) 2009 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found
var additionalInfo = {
        "title": document.title,
        "url": window.location.href
    },
    runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
        'runtime' : 'extension';

//debugger;

chrome[runtimeOrExtension].sendMessage({page_data: additionalInfo}, function (response) {
    console.log(response.farewell);
});

chrome[runtimeOrExtension].onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.question == additionalInfo.title) {
            alert("YES");
        }
        else {
            alert("NO");
        }
    });
