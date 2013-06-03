var window_id = 0;
var windowObj = {};
var tempArr = new Array();
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if(request.from == "background"){
        windowObj = request.page_data;
        title.value = windowObj.title;
        url.value = windowObj.url;
      } 
    });


function addToHistory() {
        windowObj.title = document.getElementById('title').value;
        windowObj.url = document.getElementById('url').value;
        chrome.extension.sendMessage({page_data: windowObj, from: "window"}, function (response) {
                            })
                        };

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', addToHistory);
});

//geting window.html ids
chrome.windows.getCurrent(function(currentWindow) {
    window_id =  currentWindow.id;
});

//close window.html if not focused
chrome.windows.onFocusChanged.addListener(function() {
    chrome.windows.remove(window_id);
});