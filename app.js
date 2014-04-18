// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
var throttle = function(func, wait, options) {
  var context, args, result;
  var timeout = null;
      var previous = 0;
      options || (options = {});
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

var handler = throttle(function() {
  console.log('subtree');
}, 3000);
document.addEventListener("DOMSubtreeModified", handler);

$(function(){
  var pattern, color, opacity;
  chrome.storage.local.get(["pattern", "color", "opacity"], function(items){
    pattern = items.pattern;
    
    if (!pattern) {
      pattern = "WIP";
    }
    
    pattern = new RegExp(pattern, "i");
    
    color = items.color || "lightgray";
    opacity = items.opacity || 0.7;

    var unhighlighter = function() {
      $('.pulls-list-group li.list-group-item').each(function(index,elem) {
        if ($(elem).find('.list-group-item-name').text().match(pattern)) {
          $(elem).css({
            "background-color": color,
            "opacity": opacity
          });
        }
      });
    };

    // unhighlighter();
    // setInterval(unhighlighter, 100);
  });
});
