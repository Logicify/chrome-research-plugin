var windowObj = {},
    runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
        'runtime' : 'extension';

chrome[runtimeOrExtension].onMessage.addListener(
    function (request, sender, sendResponse) {
            windowObj = request.page_data;
            sendResponse({farewell: "OK!"});
    });

chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "windows_connection");
    port.onMessage.addListener(function(msg) {
        if (msg.give_me == "Send an object")
            port.postMessage({take_this: windowObj});
        else if (msg.take_update) {
            var tempArr = new Array();
            if (localStorage.localHistory)
                tempArr = JSON.parse(localStorage.localHistory);
            tempArr.push(msg.take_update.page_data);
            localStorage.localHistory = JSON.stringify(tempArr);
        }
    });
});