var queryinfo = {
	pinned : false,
	currentWindow : true,
	title : "placeholder",
};

function killtabs(placeholder) {
	chrome.storage.sync.get(["rawtitles","rawurls"],function(rawrules) {
		var titles = rawrules["rawtitles"].split('\n');
		var urls = rawrules["rawurls"].split('\n');
		for (var i = 0; i < titles.length; i++) {
			queryinfo.title = titles[i];
			chrome.tabs.query(queryinfo,dokill);
		}
		delete queryinfo.title;
		for (var i = 0; i < urls.length; i++) {
			queryinfo.url = urls[i];
			chrome.tabs.query(queryinfo,dokill);
		}
	});
}

function dokill(tabs) {
	var tabid_array = new Array();
	for (var i = 0; i < tabs.length; i++) {
		tabid_array.push(tabs[i].id);
	}
	chrome.tabs.remove(tabid_array);
}


chrome.browserAction.onClicked.addListener(killtabs);

