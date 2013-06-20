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
}

window.onload = function () {
    if (windowObj.copy_text !== '') {
        var input = document.createElement("textarea"),
            content = document.getElementsByClassName("content"),
            newcontent = document.createElement("div"),
            node = document.createTextNode(windowObj.copy_text);
        input.setAttribute("id", "copy_text");
        input.setAttribute("rows", 3);
        newcontent.setAttribute("class", "content")
        document.getElementsByClassName("pull-right")[0].removeChild(content[0])
        document.getElementsByClassName("pull-right")[0].appendChild(newcontent)
        input.appendChild(node);
        content[0].appendChild(input);
    }
    selectProjects();
    for (var i = 0; i < projectsArr.length; ++i) {
        addOption(document.dropDown.selectProject, projectsArr[i], projectsArr[i]);
    }
}

function addToHistory() {
    windowObj.title = document.getElementById('title').value;
    windowObj.url = document.getElementById('url').value;
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
}
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
