var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
    'runtime' : 'extension';
window.addEventListener("keydown", function(event) {
    var modifier = event.ctrlKey || event.metaKey;
    if (modifier && event.shiftKey && event.keyCode == 89) {

        var getFavicon = function() {
            var favicon = undefined;
            var nodeList = document.getElementsByTagName("link");
            for (var i = 0; i < nodeList.length; i++) {
                if ((nodeList[i].getAttribute("rel") == "icon") || (nodeList[i].getAttribute("rel") == "shortcut icon")) {
                    favicon = nodeList[i].getAttribute("href");
                }
            }
            return favicon;
        };

        function checkMinutes(minutes) {
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            return minutes;
        }

        var time = new Date();
        var day = time.getDate();
        var month = time.getMonth() + 1;
        var year = time.getFullYear();
        var dateAndTime = day + '.' + month + '.' + year + ' ' + checkMinutes(time.getHours()) + ':' + checkMinutes(time.getMinutes()) + ' ';
        var additionalInfo = {
            "title": document.title,
            "url": window.location.href,
            "icon": getFavicon(),
            "date": dateAndTime,
            "project": " "
        };


        chrome.runtime.sendMessage({
            page_data: additionalInfo,
            from: "content"
        }, function(response) {
            console.log(response.farewell);
        });


    }*/
    else 
        if (modifier &&  event.keyCode == 67) var getText=window.getSelection());
    else return ;


})