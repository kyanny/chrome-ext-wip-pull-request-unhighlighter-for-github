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
    
    $('.pulls-list-group li.list-group-item').each(function(index,elem) {
      if ($(elem).find('.list-group-item-name').text().match(pattern)) {
        $(elem).css({
          "background-color": color,
          "opacity": opacity
        });
      }
    });
  });
});
