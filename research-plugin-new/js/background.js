var s = document.createElement('content');
s.src = chrome.extension.getURL("/js/content.js");
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);