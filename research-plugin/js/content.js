var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
    'runtime' : 'extension';
window.addEventListener("keydown", function (event) {
    var modifier = event.ctrlKey || event.metaKey,
        copy_text = window.getSelection().toString();
    if (modifier && event.shiftKey && event.keyCode == 89) {
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
            "typeoflink": "",
            "title": document.title,
            "url": window.location.href,
            "icon": '',//getFavicon(),
            "date": dateAndTime,
            "project": '',
            "copy_text": copy_text
        };


        chrome.runtime.sendMessage({
            page_data: additionalInfo,
            from: "content"
        }, function (response) {
            console.log(response.farewell);
        });

    }
    else return;


})