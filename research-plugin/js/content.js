window.addEventListener("keydown", function(event) {
  var modifier = event.ctrlKey || event.metaKey;
  if (modifier && event.shiftKey && event.keyCode == 89) {
	window.open(chrome.extension.getURL("/html/window.html"), 'title', 'width=300, height=300, left=450, top=60');
	
  }
});
