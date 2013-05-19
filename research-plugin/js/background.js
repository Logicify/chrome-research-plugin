var windowObj ={},
    runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
        'runtime' : 'extension';
//listen massage from content.js
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        sendResponse({farewell: "OK!"});
        var tempArr = new Array();
        if (localStorage.localHistory)
            tempArr = JSON.parse(localStorage.localHistory);
        tempArr.push(request.page_data);
        localStorage.localHistory = JSON.stringify(tempArr);
});

