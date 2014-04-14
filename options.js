// default rules here
var default_title = "* - Google Search";
var default_url = "*://www.google.*/search*\n*://*.bing.com/search?q=*";

function saverule(e) {
	var rawtitles = document.getElementById("titles").value;
	var rawurls = document.getElementById("urls").value;
	chrome.storage.sync.set({'rawtitles' : rawtitles , 'rawurls' : rawurls}, function() {
		// TODO notify user
	});
}

function defaultrule(e) {
	// apply default rules
	document.getElementById("titles").value = default_title;
	document.getElementById("urls").value = default_url;
	saverule(e);
}

// When options page has finished loading
document.addEventListener('DOMContentLoaded', function () {
	// Read from storage
	chrome.storage.sync.get(["rawtitles","rawurls"],function(rawrules) {
		// When first run, apply default rule
		if (chrome.runtime.lastError) {
			defaultrule(null);
			return;
		}
		var rawtitles = rawrules["rawtitles"];
		var rawurls = rawrules["rawurls"];
		document.getElementById("titles").value = rawtitles;
		document.getElementById("urls").value = rawurls;
	});
	// Register button click handler
	document.querySelector('#savebut').addEventListener('click', saverule);
	document.querySelector('#defaultbut').addEventListener('click', defaultrule);
});