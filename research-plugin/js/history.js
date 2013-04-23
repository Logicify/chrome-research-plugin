
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



}

