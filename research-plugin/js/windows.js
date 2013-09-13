var windowObj = {};
var tempArr = new Array();
var projectsArr = new Array();
var window_id = 0;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.from == "background") {
        windowObj = request.page_data;
        title.value = windowObj.title;
        url.value = windowObj.url;
    }
    if (windowObj.copy_text) {
        var content = document.getElementsByClassName('content')[0],
            textarea = document.createElement('textarea'),
            copy_text = document.createTextNode(windowObj.copy_text);
        textarea.setAttribute('id', 'copy_text');
        textarea.appendChild(copy_text);
        content.appendChild(textarea);
    }
    if (windowObj.image) {
        var img = document.getElementById('image');
        img.setAttribute('src', windowObj.image);;
    }
});

function selectProjects() {
    tempArr = JSON.parse(localStorage.localHistory);
    for (var i = 0; i < tempArr.length; i++)
        projectsArr[i] = tempArr[i].project;
    projectsArr.sort();
    for (var i = 0; i < projectsArr.length; i++)
        for (var j = i + 1; j < projectsArr.length;)
            if (projectsArr[i] == projectsArr[j]) projectsArr.splice(j, 1);
            else j++;
};

function addOption(selectbox, text, value) {
    var optn = document.createElement("option");
    optn.text = text;
    optn.value = value;
    selectbox.options.add(optn);
};

window.onload = function () {
    selectProjects();
    for (var i = 0; i < projectsArr.length; ++i) {
        addOption(document.dropDown.selectProject, projectsArr[i], projectsArr[i]);
    }
};

function addToHistory() {
    windowObj.title = document.getElementById('title').value;
    windowObj.url = document.getElementById('url').value;
    if (windowObj.typeoflink === '') {
        windowObj.typeoflink = "Bookmark";
    }
    if (windowObj.copy_text && windowObj !== '') {
        windowObj.typeoflink = "Text";
        windowObj.copy_text = document.getElementById('copy_text').value;
    }
    if (document.dropDown.selectProject.value == "New project") {
        if (document.getElementById('myinput').value == 0) {
            alert("Please enter project name");
            return;
        }
        else
            windowObj.project = document.getElementById('myinput').value;
    }
    else {


        windowObj.project = document.dropDown.selectProject.value;
    }
    chrome.extension.sendMessage({
        page_data: windowObj,
        from: "window"
    }, function (response) {
    })
    window.close();
};

function checkProject() {
    if (document.dropDown.selectProject.value == "New project")
        document.getElementById('myinput').style.visibility = "visible";
    else  document.getElementById('myinput').style.visibility = "hidden";
};

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sp").addEventListener("change", checkProject);
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', addToHistory);
});

//geting window.html ids
chrome.windows.getCurrent(function (currentWindow) {
    window_id = currentWindow.id;
});

//close window.html if not focused
/*
 chrome.windows.onFocusChanged.addListener(function () {
 chrome.windows.remove(window_id);
 });*/
