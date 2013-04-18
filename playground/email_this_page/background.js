// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
    'runtime' : 'extension';
//Take a message from content script
chrome[runtimeOrExtension].onMessage.addListener(
    function (request, sender, sendResponse) {
        sendResponse({farewell: "OK!"});
        localStorage.setItem("page_title", request.page_data.title);
        localStorage.setItem("page_url", request.page_data.url.toString());
    });
//Show what it take from content script
chrome.tabs.onCreated.addListener(function (tab) {
    alert(localStorage.getItem("page_title") + localStorage.getItem("page_url"));
});

//Send message to content script
chrome.tabs.onUpdated.addListener(function (tab){
chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.sendMessage(tab.id, {question: localStorage.getItem("page_title")}, function (response) {
        console.log(response.farewell);
    });
});
});