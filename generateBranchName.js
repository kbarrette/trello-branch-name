(function($) {

  function getBranchName() {
    var hash = window.location.pathname.match(/\/c\/(.*?)\//)[1];
    var title = $('h2.window-title-text').text();
    copyBranchName(title, hash);
  }

  function copyBranchName(title, hash) {
    chrome.extension.sendMessage({action: "copyBranchName", title: title, hash: hash});
  }

  getBranchName();
})(jQuery);
