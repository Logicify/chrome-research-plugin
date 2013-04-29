var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
        'runtime' : 'extension',
    windowObj = {};


window.onload = function () {
    //listen massage from background.js
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            sendResponse({farewell: "OK!"});
            var title = document.getElementById('title');
            var url = document.getElementById('url');
            var icon = document.getElementById('icon');
            title.value = request.title;
            url.value = request.url;
            if(request.icon === undefined){
                icon.src = '../img/16.png'
            }
            else {
                icon.src = request.url.substring(0, request.url.length-1) + request.icon;
            }

                document.querySelector('button').addEventListener('click', function() {
                   // document.addEventListener('DOMContentLoaded', function () {
                        windowObj.title = document.getElementById('title').value;
                        windowObj.url = document.getElementById('url').value;
                        windowObj.icon = request.icon;
                        windowObj.date = request.date;
                        function addToHistory() {
                            chrome.extention.sendMessage({window_page: windowObj}, function (response) {
                                console.log(response.farewell);
                                alert(sessionStorage.localHistory)
                            })
                        }
                //});
        });})
}

