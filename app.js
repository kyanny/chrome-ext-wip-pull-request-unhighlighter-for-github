chrome.storage.local.get(['pattern', 'case_insensitive', 'color', 'opacity'], function(items) {
  var pattern, case_insensitive, color, opacity;
  var re, flags;

  pattern = items.pattern;
  if (!pattern) {
    pattern = 'WIP';
  }

  case_insensitive = !!items.case_insensitive;
  if (case_insensitive) {
    flags = 'i';
  } else {
    flags = '';
  }

  re = new RegExp(pattern, flags);

  color   = items.color   || 'lightgray';
  opacity = items.opacity || 0.7;

  var unhighlighter = function(element, re, color, opacity) {
    if (element.querySelector('.list-group-item-name, .issue-title-link').innerText.match(re)) {
      element.style.backgroundColor = color;
      element.style.opacity = opacity;
    }
  };

  var target = document.querySelector('body');
  var config = {
    childList: true,
    subtree: true
  };

  var observer = new MutationObserver(function(mutations, self) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        var elements = document.querySelectorAll('.pulls-list-group li.list-group-item, ul.table-list-issues li.table-list-item');

        Array.prototype.forEach.call(elements, function(element) {
          unhighlighter(element, re, color, opacity);
        });
      }
    });
  });

  observer.observe(target, config);
});
