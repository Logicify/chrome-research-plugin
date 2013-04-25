function addRow(date, icon, url, title) {
    var table = document.getElementById('historyTable');
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = date;
    cell2.innerHTML = ' <img src="' + icon + '"> ' + '<a href="' + url + '">' + title + '</a>';
}

window.onload = function () {
    var localHistory = [];
    var temp = localStorage.getItem('localHistory');
    localHistory = JSON.parse(temp);

    for (var i = 0; i < 5; i++) {
        var historyObject = localHistory[i];
        addRow(historyObject.date, historyObject.icon, historyObject.url, historyObject.title);
    }
};