'use strict';

var fullscreenToggle = document.querySelector('#fullscreen');

// Fullscreen
fullscreenToggle.addEventListener('click', function (e) {
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
