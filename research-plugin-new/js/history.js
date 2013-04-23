﻿function addRow(date,icon,url ){
	var table=document.getElementById('historyTable');
	var row = table.insertRow(1);
	var cell1=row.insertCell(0);
	var cell2=row.insertCell(1);
	cell1.innerHTML = date;
	cell2.innerHTML = ' <img src="' + icon + '"> ' + '<a href="' + url + '">' + url + '</a>';
}

window.onload = function() {
	var time = new Date();

	function checkMinutes(minutes) {
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		return minutes;
	}
	var localHistory = [];
	var day = time.getDate();
	var month = time.getMonth() + 1;
	var year = time.getFullYear();
	var dateAndTime = day + '.' + month + '.' + year + ' ' + checkMinutes(time.getHours()) + ':' + checkMinutes(time.getMinutes()) + ' ';


	var tempArr = [];


	localStorage.tempArr = JSON.stringify(tempArr);


	localHistory = JSON.parse(localStorage['tempArr']);

	for (var i = 0; i < 5; i++) {
		var historyObject = localHistory[i];
		addRow(historyObject.date, historyObject.icon, historyObject.title);
		/* var div = document.createElement("div");
		document.body.appendChild(div);
		div.innerHTML = historyObject.date + ' <img src="' + historyObject.icon + '"> ' + '<a href="' + historyObject.url + '">' + historyObject.url + '</a>'; */
	}



}
