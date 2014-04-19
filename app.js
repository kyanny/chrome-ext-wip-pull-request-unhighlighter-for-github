chrome.storage.local.get(['pattern', 'color', 'opacity'], function(items) {
  var pattern, color, opacity;

  pattern = items.pattern;
  if (!pattern) {
    pattern = 'WIP';
  }
  pattern = new RegExp(pattern, 'i');

  color   = items.color   || 'lightgray';
  opacity = items.opacity || 0.7;

  var unhighlighter = function(element, pattern, color, opacity) {
    if (element.querySelector('.list-group-item-name').innerText.match(pattern)) {
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
        var elements = document.querySelectorAll('.pulls-list-group li.list-group-item');

        Array.prototype.forEach.call(elements, function(element) {
          unhighlighter(element, pattern, color, opacity);
        });
      }
    });
  });

  observer.observe(target, config);
});
