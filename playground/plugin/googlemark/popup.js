var button = document.getElementById("clear-btn");
button.addEventListener("click", function () {
    chrome.extension.sendRequest({ action: "clear" });
});