function saveRule(e) {
    var rawtitles = document.getElementById("titles").value;
    var rawurls = document.getElementById("urls").value;
    chrome.storage.local.set({'rawtitles' : rawtitles , 'rawurls' : rawurls}, function() {
        $('#notify').text("Changes saved");
        $('#notify').show();
        $('#notify').fadeOut(3000); // 3 seconds
    });
}

function defaultRule(e) {
    // apply default rules
    var default_title = "* - Google Search";
    var default_url = "";
    document.getElementById("titles").value = default_title;
    document.getElementById("urls").value = default_url;
    saveRule(e);
}

// When options page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    $('#notify').hide();
    // Read from storage
    chrome.storage.local.get(["rawtitles","rawurls"],function(rawrules) {
        var rawtitles = rawrules["rawtitles"];
        var rawurls = rawrules["rawurls"];
        document.getElementById("titles").value = rawtitles;
        document.getElementById("urls").value = rawurls;
    });
    // Register button click handler
    document.querySelector('#savebut').addEventListener('click', saveRule);
    document.querySelector('#defaultbut').addEventListener('click', defaultRule);
});
