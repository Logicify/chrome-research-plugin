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
    for (var i = 0; i < tempArr.length; i++)
        for (var j = i + 1; j < tempArr.length; j++)
            if ((projectsArr[i] == projectsArr[j]) || (projectsArr[i - 1] == projectsArr[j]) || (projectsArr[i + 1] == projectsArr[j]))
                projectsArr.splice(j, 1);
  
};

function addOption(selectbox, text, value) {
    var optn = document.createElement("option");
    optn.text = text;
    optn.value = value;
    selectbox.options.add(optn);
}

window.onload = function () {
    selectProjects();
    for (var i = 0; i < projectsArr.length; ++i) {
        addOption(document.dropDown.selectProject, projectsArr[i], projectsArr[i]);
    }
}

function addToHistory() {
    windowObj.title = document.getElementById('title').value;
    windowObj.url = document.getElementById('url').value;
    if (document.dropDown.selectProject.value == "New project")
    {
        if(document.getElementById('myinput').value==0){
            alert("Please enter project name"); 
            return ;}
        else 
        windowObj.project = document.getElementById('project').value;
    }
    else
    {
         

        windowObj.project = document.dropDown.selectProject.value;
    }
    chrome.extension.sendMessage({
        page_data: windowObj,
        from: "window"
    }, function (response) {
    })
};
function azaza(){
        if(document.dropDown.selectProject.value=="New project")
            document.getElementById('myinput').style.visibility = "visible";
        else  document.getElementById('myinput').style.visibility = "hidden" ;
}
window.setInterval(azaza,500);
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', addToHistory);
});
//geting window.html ids
/*chrome.windows.getCurrent(function(currentWindow) {
    window_id =  currentWindow.id;
});

//close window.html if not focused
chrome.windows.onFocusChanged.addListener(function() {
    chrome.windows.remove(window_id);
});*/