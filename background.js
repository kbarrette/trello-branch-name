// Initialize storage
if (!localStorage.isInitialized) {
  localStorage.onlyCopyHash = false;
}

// Copy text to OS clipboard
function copy(text) {
  $("#clipboard").val(text).select();
  document.execCommand("copy");
  $("#clipboard").val("");
}

// Only activate on matching urls
var trello_urls = new RegExp(".*://trello.com/card/.*");
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (trello_urls.test(tab.url)) {
    chrome.pageAction.show(tabId);
  }
});

// When pageAction button is clicked
chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(
    tab.id,
    {file: "jquery-1.9.0.min.js"},
    function () { chrome.tabs.executeScript(tab.id, {file: "generateBranchName.js"}); }
  );
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

  // Copy branch name to OS clipboard
  if (request.action == "copyBranchName" && request.title && request.hash) {
    var formatted_title = request.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '_');
    var branch_name = JSON.parse(localStorage.onlyCopyHash) ? "tr_" + request.hash : formatted_title + "_tr_" + request.hash;
    copy(branch_name);

    webkitNotifications.createNotification(null, "Copied branch name", "Copied '" + branch_name + "' to clipboard").show();
  }

  sendResponse({});
});


