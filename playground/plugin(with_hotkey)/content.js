function actionClicked(tab) {
    chrome.debugger.attach({tabId: tab.id}, version, onAttach.bind(null, tab.id));
}

function onAttach(tabId) {
    if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
        return;
    }

    chrome.windows.create(
        {url: "browser_action.html?" + tabId, type: "popup", width: 300, height: 300});

}

window.addEventListener("keydown", function (event) {
    var modifier = event.ctrlKey || event.metaKey;
    if (modifier && event.shiftKey && event.keyCode == 89) {
        alert('tab added');
    }
});


// alert('test');