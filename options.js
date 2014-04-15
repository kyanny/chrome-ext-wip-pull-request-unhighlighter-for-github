$(function(){
  var pattern, color, opacity;
  chrome.storage.local.get(["pattern", "color", "opacity"], function(items){
    $('#pattern').val(items.pattern);
    $('#color').val(items.color);
    $('#opacity').val(items.opacity);
  });

  $('#save').click(function(e){
    pattern = $('#pattern').val();
    color = $('#color').val();
    opacity = $('#opacity').val();

    chrome.storage.local.set({"pattern": pattern, "color": color, "opacity": opacity}, function(){
      $('#saved').show();
      setTimeout(function(){
        $('#saved').fadeOut();
      }, 500);
    });
  });
});