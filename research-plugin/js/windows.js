var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
        'runtime' : 'extension',
    windowObj = {};
//listen massage from background.js
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        sendResponse({farewell: "OK!"});
        var title = document.getElementById('title');
        var url = document.getElementById('url');
        var icon = document.getElementById('icon');
        var date = document.getElementById('date');
        title.value = request.title;
        url.value = request.url;
        icon.value = request.icon;
        date.value = request.date;

    });

function getValue() {
    windowObj.title = document.getElementById('title').value;
    windowObj.url = document.getElementById('url').value;
    windowObj.icon = document.getElementById('icon').value;
    windowObj.date = document.getElementById('date').value;
    addToHistory(windowObj);
};

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', getValue);
});

