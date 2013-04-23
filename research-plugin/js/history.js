<<<<<<< HEAD
=======
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
	var path;
	var icon;
>>>>>>> d99abf02556eddfec72d712c3f80318114e22d57

function addRow(date,icon,url,title ){
	var table=document.getElementById('historyTable');
	var row = table.insertRow(1);
	var cell1=row.insertCell(0);
	var cell2=row.insertCell(1);
	cell1.innerHTML = date;
	cell2.innerHTML = ' <img src="' + icon + '"> ' + '<a href="' + url + '">' + title + '</a>';
}

window.onload = function() {
	var localHistory=[];
	var historyObject;
	var temp=localStorage.getItem('localHistory');
	localHistory = JSON.parse(temp);

	for (var i = 0; i < 5; i++) {
		historyObject = localHistory;
		addRow(historyObject.date, historOybject.icon,historyObject.url,historyObject.title);
		/* var div = document.createElement("div");
		document.body.appendChild(div);
		div.innerHTML = historyObject.date + ' <img src="' + historyObject.icon + '"> ' + '<a href="' + historyObject.url + '">' + historyObject.url + '</a>'; */
	}

<<<<<<< HEAD
=======
	localStorage.tempArr = JSON.stringify(tempArr);
>>>>>>> d99abf02556eddfec72d712c3f80318114e22d57


}

<<<<<<< HEAD
=======
	for (var i = 0; i < 5; i++) {
		var historyObject = localHistory[i];
		addRow(historyObject.date, historyObject.icon, historyObject.title);
		/* var div = document.createElement("div");
		document.body.appendChild(div);
		div.innerHTML = historyObject.date + ' <img src="' + historyObject.icon + '"> ' + '<a href="' + historyObject.url + '">' + historyObject.url + '</a>'; */
	}
}

>>>>>>> d99abf02556eddfec72d712c3f80318114e22d57
