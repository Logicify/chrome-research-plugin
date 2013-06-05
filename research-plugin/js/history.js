function addRow(project, date, icon, url, title) {
    var table = document.getElementById('historyTable');
    var row = table.insertRow(1);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    if (icon === undefined) {
        var icon_url = "../img/16.png";
    } else if (icon.substring(0, 1) !== '/') {
        var icon_url = icon;
    } else {
        var icon_url = url.substring(0, url.length) + icon;
    }
    if (project)
        cell1.innerHTML = project;
    else
        cell1.innerHTML = 'No project';
    cell2.innerHTML = date;
    cell3.innerHTML = ' <img src="' + icon_url + '" height="16"> ' + '<a href="' + url + '">' + title + '</a>';
}

window.onload = function() {
    var localHistory =[];
    var temp = localStorage.getItem('localHistory');
    localHistory = JSON.parse(temp);

    for (var i = 0; i < temp.length; i++) {
        var historyObject = localHistory[i];
        addRow(historyObject.project, historyObject.date, historyObject.icon, historyObject.url, historyObject.title);
    }
};