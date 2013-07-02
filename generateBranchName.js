(function($) {

  var popover_selector = 'div.pop-over:visible';

  function getBranchName() {
    var hash = $(':contains("Link to this card") ~ input')[0].value.replace(/http.*\//, '');
    var title = $('h2.window-title-text').text();
    copyBranchName(title, hash);
  }

  function openPopover() {
    $('a.js-more-menu')[0].click();
  }

  function closePopover() {
    $(popover_selector + " .js-close-popover")[0].click();
  }

  function copyBranchName(title, hash) {
    chrome.extension.sendMessage({action: "copyBranchName", title: title, hash: hash});
  }

  if (!$(popover_selector).length) {
    openPopover();
    setTimeout(function() {
      getBranchName();
      closePopover();
    }, 1000);

  } else {
    getBranchName();
  }

})(jQuery);
