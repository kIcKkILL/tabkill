function globStringToRegex(str) {
    return new RegExp(preg_quote(str).replace(/\\\*/g, '.*').replace(/\\\?/g, '.'), 'g');
}
function preg_quote (str, delimiter) {
    // http://kevin.vanzonneveld.net
    // +   original by: booeyOH
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: preg_quote("$40");
    // *     returns 1: '\$40'
    // *     example 2: preg_quote("*RRRING* Hello?");
    // *     returns 2: '\*RRRING\* Hello\?'
    // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
    // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'
    return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
}

function firstRun(e) {
    // set default rules
    var default_title = "* - Google Search";
    var default_url = "";
    chrome.storage.local.get({rawtitles: default_title}, function(data) {
        chrome.storage.local.set({links: data.rawtitles}, function() {
        });
    });
    chrome.storage.local.get({rawurls: default_url}, function(data) {
        chrome.storage.local.set({links: data.rawurls}, function() {
        });
    });
    chrome.storage.local.set({ 'rawtitles': default_title, 'rawurls': default_url });
}

var queryinfo = {
    pinned: false,
    currentWindow: true,
};

function killTabs(placeholder) {
    chrome.storage.local.get(["rawtitles", "rawurls"], function (rawrules) {
        var titles = rawrules["rawtitles"].split('\n').filter(function(x){return x!=""});
        var urls = rawrules["rawurls"].split('\n').filter(function(x){return x!=""});
        /*
        // This commented-out code does not work on firefox
        for (i in titles) {
            queryinfo.title = titles[i];
            chrome.tabs.query(queryinfo, doKill);
        }
        */
        chrome.tabs.query(queryinfo, function(tabs) {
            var tabid_array = new Array();
            var regs = titles.map(globStringToRegex);
            for (i in tabs) {
                for (r in regs) {
                    if (tabs[i].title.match(regs[r])) {
                        tabid_array.push(tabs[i].id);
                        break;
                    }
                }
            }
            chrome.tabs.remove(tabid_array);
        });

        if (!(urls === undefined) && urls.length != 0) {
            delete queryinfo.title;
            queryinfo.url = urls;
            chrome.tabs.query(queryinfo, doKill);
            delete queryinfo.url;
        }
    });
}

function doKill(tabs) {
    var tabid_array = new Array();
    for (i in tabs) {
        tabid_array.push(tabs[i].id);
    }
    chrome.tabs.remove(tabid_array);
}

chrome.browserAction.onClicked.addListener(killTabs);

chrome.runtime.onInstalled.addListener(firstRun);