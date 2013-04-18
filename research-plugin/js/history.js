window.onload = function() {
	var time = new Date();
	var path;
	var icon;

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
	var localArray = [{
		url: "http://vk.com/im?sel=30547642",
		icon: "http://vk.com/images/fav_chat.ico?1",
		date: dateAndTime
	}, {
		url: "vk.com",
		icon: "http://vk.com/images/faviconnew.ico",
		date: dateAndTime
	}, {
		url: "http://www.odnoklassniki.ru/",
		icon: "http://vk.com/images/fav_chat.ico?1",
		date: dateAndTime
	}, {
		url: "http://vk.com/im?sel=30547642",
		icon: "http://vk.com/images/faviconnew.ico",
		date: dateAndTime
	}, {
		url: "http://vk.com/im?sel=30547642",
		icon: "http://vk.com/images/fav_chat.ico?1",
		date: dateAndTime
	}];


	localStorage.tempArr = JSON.stringify(localArray);


	localHistory = JSON.parse(localStorage['tempArr']);

	for (var i = 0; i < 5; i++) {
		var historyObject = localHistory[i];
		var div = document.createElement("div");
		document.body.appendChild(div);
		div.innerHTML = historyObject.date + ' <img src="' + historyObject.icon + '"> ' + '<a href="' + historyObject.url + '">' + historyObject.url + '</a>';
	}
}