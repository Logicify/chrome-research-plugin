var tempArr = new Array();
var windowObj = {},
    runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
        'runtime' : 'extension';
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.from == "window") {
        if (localStorage.localHistory)
            tempArr = JSON.parse(localStorage.localHistory);
        tempArr.push(request.page_data);
        localStorage.localHistory = JSON.stringify(tempArr);
    } else if (request.from == "content") {
        window.open(chrome.extension.getURL("/html/window.html"), 'title', 'width=300, height=300, left=450, top=60');
        windowObj = request.page_data;
        chrome.runtime.sendMessage({
            page_data: windowObj,
            from: 'background'
        }, function(response) {

        });
        sendResponse({
            farewell: "OK!"
        });
    }

});