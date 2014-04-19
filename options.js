window.onload = function() {
  var fields = ['pattern', 'case_insensitive', 'color', 'opacity'];
  var config = {};

  // load config from chrome local storage
  chrome.storage.local.get(fields, function(items) {
    fields.forEach(function(field) {
      var elem = document.getElementById(field);
      if (elem) {
        switch(elem.type) {
         case 'text':
          elem.value = items[field];
          break;
         case 'checkbox':
          elem.checked = !!items[field];
          break;
        }
      }
    });
  });

  var form = document.getElementById('form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    fields.forEach(function(field) {
      var elem = document.getElementById(field);
      if (elem) {
        switch(elem.type) {
         case 'text':
          config[field] = elem.value;
          break;
         case 'checkbox':
          config[field] = elem.checked;
          break;
        }
      }
    });

    // save config to chrome local storage
    chrome.storage.local.set(config, function() {
      alert('saved!');
    });
  });
};
