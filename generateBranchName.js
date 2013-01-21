(function($) {

  var popover_selector = 'div.pop-over:visible';

  function getBranchName() {
    var hash = $(':contains("Link to this card") ~ input')[0].value.replace(/http.*\//, '');
    var title = $('h2.window-title-text').text().toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '_');
    var branch_name = title + "_tr_" + hash;

    copy(branch_name);
  }

  function openPopover() {
    $('a:contains("More")')[0].click();
  }

  function closePopover() {
    $(popover_selector + " .js-close-popover")[0].click();
  }

  function copy(branch_name) {
    chrome.extension.sendMessage({action: "copy", value: branch_name});
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
