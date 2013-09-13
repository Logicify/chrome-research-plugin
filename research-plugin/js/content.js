var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ?
        'runtime' : 'extension',
    additionalInfo = {};

function checkMinutes(minutes) {
 if (minutes < 10) {
 minutes = "0" + minutes;
 }
 return minutes;
 }


 function dateAndTime() {
 var time = new Date();
 var day = time.getDate();
 var month = time.getMonth() + 1;
 var year = time.getFullYear();
 return day + '.' + month + '.' + year + ' ' + checkMinutes(time.getHours()) + ':' + checkMinutes(time.getMinutes()) + ' ';
 }

function handler(e) {
    e = event;
    if (e.type === 'mouseover' && e.target.tagName.toLowerCase() === 'img') {
        e.target.setAttribute('title', e.target.src.toString());
    }
    document.addEventListener('click', function (e) {
            var mouseX = e.pageX,
                mouseY = e.pageY,
                div = document.getElementsByClassName('clickablediv')[0];
            mouseX = (mouseX < 0) ? 0 : mouseX;
            mouseY = (mouseY < 0) ? 0 : mouseY;
            if (div) document.getElementsByTagName('body')[0].removeChild(div);
            var element = document.elementFromPoint(mouseX, mouseY);
            if (element.src) {
                additionalInfo = {
                    "typeoflink": "Images",
                    "title": document.title,
                    "url": window.location.href,
                    "date": dateAndTime(),
                    "project": '',
                    "icon": '',
                    "image": element.src,
                    "copy_text": ''
                };
                var images = document.getElementsByTagName('img');

                for (var image = 0; image < images.length; image++) {
                    images[image].style.border = 'none';
                    //document.onmouseover = document.onmouseout = handler;
                }
                chrome.runtime.sendMessage({
                    page_data: additionalInfo,
                    from: "content"
                }, function (response) {
                    console.log(response.farewell);
                });

            }
        }
    );
}

window.addEventListener("keydown", function (event) {
    var modifier = event.ctrlKey || event.metaKey,
        copy_text = window.getSelection().toString();
    if (modifier && event.shiftKey && event.keyCode == 89) {
        additionalInfo = {
            "typeoflink": "",
            "title": document.title,
            "url": window.location.href,
            "icon": '',
            "date": '',//dateAndTime(),
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
    else if (modifier && event.shiftKey && event.keyCode == 83) {
        var width = 0,
            height = 0;
        var images = document.getElementsByTagName('img');

        for (var image = 0; image < images.length; image++) {
            images[image].style.border = '5px solid red';
            //document.onmouseover = document.onmouseout = handler;
        }
        var body = document.getElementsByTagName('body')[0],
            div = document.createElement('div');
        div.setAttribute('class', 'clickablediv');
        div.style.position = 'absolute';
        div.style.top = '0';
        div.style.left = '0';
        div.style.width = document.body.clientWidth + 'px';
        div.style.height = document.body.clientHeight + 'px';
	div.style.zIndex = 10000;
	div.style.background = 'white'; 
	div.style.opacity = .3;
        div.textContent = '  ';
        if (!document.getElementsByClassName('clickablediv')[0])
            body.appendChild(div);
        handler();
    }
    else return;


})
