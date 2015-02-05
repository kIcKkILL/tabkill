var queryinfo = {
    pinned : false,
    currentWindow : true,
    title : "placeholder",
};

function killTabs(placeholder) {
    chrome.storage.sync.get(["rawtitles","rawurls"],function(rawrules) {
        var titles = rawrules["rawtitles"].split('\n');
        var urls = rawrules["rawurls"].split('\n');
        for (i in titles) {
            queryinfo.title = titles[i];
            chrome.tabs.query(queryinfo,doKill);
        }
        delete queryinfo.title;
        queryinfo.url = urls;
        chrome.tabs.query(queryinfo,doKill);
    });
}

function doKill(tabs) {
    var tabid_array = new Array();
    for (i in tabs) {
        console.log(i);
        tabid_array.push(tabs[i].id);
    }
    chrome.tabs.remove(tabid_array);
}


chrome.browserAction.onClicked.addListener(killTabs);

