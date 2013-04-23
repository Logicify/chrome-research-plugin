var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
        'runtime' : 'extension',
        windowObj = {
         
        };

chrome[runtimeOrExtension].onMessage.addListener(
    function (request, sender, sendResponse) {
        sendResponse({farewell: "OK!"});
        windowObj.title = request.page_data.title;
        windowObj.url = request.page_data.url;
        windowObj.icon = request.page_data.icon;
        windowObj.date = request.page_data.date;
        alert(JSON.stringify(windowObj));
    });


function addToHistory(){



 var tempArr = new Array();
 if(localStorage.localHistory)
 tempArr = JSON.parse(localStorage.localHistory);
 tempArr.push(windowObj);
 alert(JSON.stringify(windowObj));
 localStorage.localHistory=JSON.stringify(tempArr);
};

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', addToHistory);
});