var windowObj = {};
var tempArr = new Array();

/*window.addEventListener('DOMContentLoaded', function(){

        var lastInStorage;
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
  document.querySelector('button').addEventListener('click', addToHistory);*/

var port = chrome.runtime.connect({name: "windows_connection"});
port.postMessage({give_me: "Send an object"});
port.onMessage.addListener(function(msg) {
    if (msg.take_this) {
        var title = document.getElementById('title');
        var url = document.getElementById('url');
        var icon = document.getElementById('icon');
        title.value = msg.take_this.title;
        url.value = msg.take_this.url;
        if(msg.take_this.icon === undefined){
            icon.src = '../img/16.png'
        }
       /* else if (msg.take_this.url.substring(0, 1) !== '/') {
            icon.src = msg.take_this.icon;
        }*/
        else {
            icon.src = msg.take_this.url.substring(0, msg.take_this.url.length-1) + msg.take_this.icon;
        }
        document.addEventListener('DOMContentLoaded', function () {
            document.querySelector('button').addEventListener('click', function () {
                windowObj.title = title.value;
                windowObj.url  = url.value;
                windowObj.icon = icon.src;
                windowObj.date = msg.take_this.date;
                port.postMessage({take_update: windowObj});
            })
        });
    }
});
