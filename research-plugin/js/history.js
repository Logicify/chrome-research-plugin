var projectsArr = new Array();
var table;
var row;
var cell1;
var cell2;
var cell3;
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
var tempvar = [];

function checkProject() {

    var tmp1 = [];
    var tmp2 = localStorage.getItem('localHistory');
    tmp1 = JSON.parse(tmp2);
    if (tempvar == document.dropDown.selectProject.value) {
        return;
    }
    if (tempvar != document.dropDown.selectProject.value) {
        var UlList = document.getElementById('historyTable').getElementsByTagName('tr');
        for (i = 1; i < (UlList.length + UlList.length); i++)
            UlList[i].parentNode.removeChild(UlList[i])
    }
    for (var i = 0; i < tmp2.length; i++) {
        var tmp3 = tmp1[i]
        if (document.dropDown.selectProject.value == tmp3.project) {
            tempvar = document.dropDown.selectProject.value;
            addRow(tmp3.project, tmp3.date, tmp3.icon, tmp3.url, tmp3.title);
        }
        else if (document.dropDown.selectProject.value == "All projects") {
            tempvar = document.dropDown.selectProject.value;
            addRow(tmp3.project, tmp3.date, tmp3.icon, tmp3.url, tmp3.title);
        }
    }

}
window.setInterval(checkProject, 100);

function addOption(selectbox, text, value) {
    var optn = document.createElement("option");
    optn.text = text;
    optn.value = value;
    selectbox.options.add(optn);
}

function get_domainname(url) {
    var pos = 0;

    for (var i = 0; i < 3 && url.length; i++) {
        var foundPos = url.indexOf('/', pos);
        if (foundPos == -1) break;

        pos = foundPos + 1; // продолжить поиск со следующей
    }
    return url.substring(0, pos);
}

function addRow(project, date, icon, url, title) {
    table = document.getElementById('historyTable');
    row = table.insertRow(1);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);
    if (icon === undefined)
        var icon_url = "../img/16.png";
    else if (icon.substring(0, 1) !== '/')
        var icon_url = icon;
    else
    /*var icon_url = url.substring(0, url.length) + icon;*/
        var icon_url = get_domainname(url) + icon;
    cell1.innerHTML = project;
    cell2.innerHTML = date;
    cell3.innerHTML = ' <img src="' + icon_url + '" height="16"> ' + '<a href="' + url + '">' + title + '</a>';
}

window.onload = function () {
    var localHistory = [];
    var temp = localStorage.getItem('localHistory');
    localHistory = JSON.parse(temp);
    selectProjects();
    for (var i = 0; i < projectsArr.length; ++i)
        addOption(document.dropDown.selectProject, projectsArr[i], projectsArr[i]);
    for (var i = 0; i < temp.length; i++) {
        var historyObject = localHistory[i];
        addRow(historyObject.project, historyObject.date, historyObject.icon, historyObject.url, historyObject.title);
    }

};