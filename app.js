$(function(){
  $('.pulls-list-group li.list-group-item').each(function(index,elem) {
    if ($(elem).find('.list-group-item-name').text().match(/(?:(?:DON'?T|DO NOT) MERGE)|WIP/)) {
      $(elem).css({"background-color":"lightgray", "opacity":0.7});
    }
  });
});
