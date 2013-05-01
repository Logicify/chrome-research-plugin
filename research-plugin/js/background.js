var windowObj = {},
    runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
        'runtime' : 'extension';
//listen massage from content.js
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        sendResponse({farewell: "OK!"});
        windowObj.title = request.page_data.title;
        windowObj.url = request.page_data.url;
        windowObj.icon = request.page_data.icon;
        windowObj.date = request.page_data.date;
        var tempArr = new Array();
        if (sessionStorage.localHistory)
            tempArr = JSON.parse(sessionStorage.localHistory);
        tempArr.push(windowObj);
        // alert('In Add to history' + JSON.stringify(object_value));
        sessionStorage.localHistory = JSON.stringify(tempArr);
        //send massage to window.js
        chrome.runtime.sendMessage(windowObj, function (response) {
            console.log(response.farewell);
            alert(sessionStorage.localHistory)
        });
    });

//listen massage from window.js
function addToHistory(add_obj) {
    var tempArr = new Array();
    if (localStorage.localHistory)
        tempArr = JSON.parse(localStorage.localHistory);
    tempArr.push(add_obj);
    // alert('In Add to history' + JSON.stringify(object_value));
    localStorage.localHistory = JSON.stringify(tempArr);
};

