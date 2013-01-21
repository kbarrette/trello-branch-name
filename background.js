chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.pageAction.show(tabId);
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(
    tab.id,
    {file: "jquery-1.9.0.min.js"},
    function () { chrome.tabs.executeScript(tab.id, {file: "generateBranchName.js"}); }
  );
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

  // Copy to OS clipboard
  if (request.action == "copy" && request.value) {
    $("#clipboard").val(request.value).select();
    document.execCommand("copy");
    $("#clipboard").val("");
    webkitNotifications.createNotification(null, "Copied branch name", "Copied '" + request.value + "' to clipboard").show();
  }

  sendResponse({});
});


