window.addEventListener('load', function() {
  options.onlyCopyHash.checked = JSON.parse(localStorage.onlyCopyHash);

  options.onlyCopyHash.onchange = function() {
    localStorage.onlyCopyHash = options.onlyCopyHash.checked;
  };
});
