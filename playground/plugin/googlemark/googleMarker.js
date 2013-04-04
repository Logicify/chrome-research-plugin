googleMarker = {
    preparePage: function() {
        var links = document.getElementsByClassName("l");
        var count = links.length;
        for(var i = 0; i < count; ++i) {
            links[i].removeAttribute("onmousedown");
        }
    },
    
    markUrl: function(url, color) {
        var block = googleMarker.findMarkingBlockByUrl(url);
        googleMarker.markBlock(block, color);
        googleMarker.saveMarker(block, color);
    },
    
    restoreUrlMark: function(url, color) {
        googleMarker.markBlock(googleMarker.findMarkingBlockByUrl(url), color);
    },
    
    findMarkingBlockByUrl: function(url) {
        var listItems = document.getElementsByClassName("l");
        var itemsCount = listItems.length;
        for(var i = 0; i < itemsCount; ++i) {
            var item = listItems[i];
            if(item.href == url) {
                return googleMarker.findMarkingBlockByNestedElement(item);
            }
        }
        return null;
    },
    
    findMarkingBlockByNestedElement: function(element) {
        if(element == null || element == 'undefined') {
            return null;
        }
        if(element.className == 'r') {
            return element;
        }
        return googleMarker.findMarkingBlockByNestedElement(element.parentNode);
    },
    
    markBlock: function(block, color) {
        if(block == null || block == 'undefined') {
            return;
        }
        var image = googleMarker.getImage(color);
        if(image == null) {
            return;
        }
        block.insertBefore(image, block.firstChild);
    },
    
    getImage: function(color) {
        var url = null;
        switch(color) {
            case "green":
                url = chrome.extension.getURL("green.png");
                break;
            case "yellow":
                url = chrome.extension.getURL("yellow.png");
                break;
            case "red":
                url = chrome.extension.getURL("red.png");
                break;
        }
        if(url == null) {
            return null;
        }
        var image = new Image();
        image.src = url;
        return image;
    },
    
    saveMarker: function(block, color) {
        var link = block.getElementsByClassName("l")[0]; 
        var url = link.href;
        chrome.extension.sendRequest( { action: "save", color: color, url: url } );
    }
}