var windowObj = {};
var tempArr = new Array();

window.addEventListener('DOMContentLoaded', function(){
var
         lastInStorage;
        tempArr = JSON.parse(localStorage.localHistory);
        lastInStorage = tempArr[tempArr.length-1];
        windowObj = lastInStorage;
        title.value = lastInStorage.title;
        url.value = lastInStorage.url;
    });



function addToHistory() {
        tempArr.pop();
        localStorage.setItem('localHistory',JSON.stringify(tempArr));
        windowObj.title = document.getElementById('title').value;
        windowObj.url = document.getElementById('url').value;
                            chrome.extension.sendMessage({page_data: windowObj}, function (response) {
                                console.log(response.farewell);
                            })
                        };

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', addToHistory);
});