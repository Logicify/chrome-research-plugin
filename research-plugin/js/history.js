function addRow(date, icon, url, title) {
    var table = document.getElementById('historyTable');
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var url_length = url.length;
    var icon_url = icon !== undefined ? url.substring(0, url_length) + icon : "../img/16.png";
    //var icon_url = url.substring(0, url_length) + icon;
    cell1.innerHTML = date;
    cell2.innerHTML = ' <img src="'+ icon_url +'" height="16"> ' + '<a href="' + url + '">' + title + '</a>';
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