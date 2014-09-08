'use strict';

module.exports = function ajax (method, url, callback) {
  var xhr = new XMLHttpRequest();

  xhr.open(method, url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      callback(('' + xhr.status).substring(0, 1) !== '2', xhr.responseText);
    }
  };

  xhr.send();
};
