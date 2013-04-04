function createMenu() {
    var urls = [
        "*://*.google.com/*",
        "*://*.google.ru/*"
    ];
    
    var root = chrome.contextMenus.create({
        title: "Mark as",
        contexts: [ "link" ],
        documentUrlPatterns: urls
    });
    
    chrome.contextMenus.create({
        title: "Green",
        contexts: [ "link" ],
        parentId: root,
        documentUrlPatterns: urls,
        onclick: function(info, tab) {
            chrome.tabs.executeScript(tab.id, { 
                code: "googleMarker.markUrl('" + info.linkUrl + "', 'green')" 
            });
        }
    });
    
    chrome.contextMenus.create({
        title: "Yellow",
        contexts: [ "link" ],
        parentId: root,
        documentUrlPatterns: urls,
        onclick: function(info, tab) {
            chrome.tabs.executeScript(tab.id, { 
                code: "googleMarker.markUrl('" + info.linkUrl + "', 'yellow')" 
            });
        }
    });
    
    chrome.contextMenus.create({
        title: "Red",
        contexts: [ "link" ],
        parentId: root,
        documentUrlPatterns: urls,
        onclick: function(info, tab) {
            chrome.tabs.executeScript(tab.id, { 
                code: "googleMarker.markUrl('" + info.linkUrl + "', 'red')"
            });
        }
    });
}

createMenu();

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        switch(request.action) {
            case "save":
                var $list = $("#" + request.color);
                if($list.lengh == 0) {
                    return;
                }
                $list.append($("<li>").append(request.url));
                break;
            case "clear":
                $("ul").empty();
                break;
        }
    }
);

chrome.webNavigation.onDOMContentLoaded.addListener(
    function(details) {
        if(details.frameId != 0) {
            return;
        }
        chrome.tabs.executeScript(details.tabId, {
                code: "googleMarker.preparePage()" 
            }
        );
        var colors = ["green", "yellow", "red"];
        for(var i = 0; i < colors.length; ++i) {
            var $urls = $("#" + colors[i] + " li");
            if($urls.length == 0) {
                continue;
            }
            
            $urls.each(function() {
                chrome.tabs.executeScript(details.tabId, {
                        code: "googleMarker.restoreUrlMark('" + 
                            this.innerText + "', '" + colors[i] + "')"    
                    }
                );
            });
        }
    }
);