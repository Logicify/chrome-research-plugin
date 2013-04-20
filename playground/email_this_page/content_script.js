// Copyright (c) 2009 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found
//debugger;

var getFavicon = function(){
    var favicon = undefined;
    var nodeList = document.getElementsByTagName("link");
    for (var i = 0; i < nodeList.length; i++)
    {
        if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
        {
            favicon = nodeList[i].getAttribute("href");
        }
    }
    return favicon;        
};
 

var  additionalInfo = {
        "title": document.title,
        "url": window.location.href,
        "icon":getFavicon()
    },
    runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
        'runtime' : 'extension';


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
