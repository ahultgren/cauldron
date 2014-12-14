'use strict';

var nameInput = document.querySelector('#player-name');
var hudName = document.querySelector('#hud-name');

// Name
nameInput.addEventListener('input', function () {
  hudName.innerHTML = nameInput.value;
  window.localStorage.setItem('playerName', nameInput.value);
}, false);

(function () {
  var name = window.localStorage.getItem('playerName');

  if(name) {
    hudName.innerHTML = name;
    nameInput.value = name;
  }
}());
