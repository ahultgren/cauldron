'use strict';

var mainMenu = document.querySelector('#main-menu');

// Fullscreen
mainMenu.addEventListener('click', function (e) {
  if(!e.target.attributes.getNamedItem('ui-fullscreen')) {
    return;
  }
  var body = document.querySelector('body');

  e.preventDefault();

  if (body.requestFullscreen) {
    body.requestFullscreen();
  } else if (body.msRequestFullscreen) {
    body.msRequestFullscreen();
  } else if (body.mozRequestFullScreen) {
    body.mozRequestFullScreen();
  } else if (body.webkitRequestFullscreen) {
    body.webkitRequestFullscreen();
  }
});
