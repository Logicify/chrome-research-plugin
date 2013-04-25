var windowObj ={};

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        sendResponse({farewell: "OK!"});
        windowObj.title = request.page_data.title;
        windowObj.url = request.page_data.url;
        windowObj.icon = request.page_data.icon;
        windowObj.date = request.page_data.date;
        addToHistory(windowObj);
    });

function addToHistory(object_value) {
    var tempArr = new Array();
    if (localStorage.localHistory)
        tempArr = JSON.parse(localStorage.localHistory);
    tempArr.push(object_value);
   // alert('In Add to history' + JSON.stringify(object_value));
    localStorage.localHistory = JSON.stringify(tempArr);
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', addToHistory);
});


window.onload = function(){
    var title = document.getElementById('title');
    var url = document.getElementById('url');
    var icon = document.getElementById('icon');
    title.value = windowObj.title;
    url.value = windowObj.url;
    icon.value = windowObj.icon;
}