'use strict';

// [TODO] Use some kind of framework

var nameInput = document.querySelector('#player-name');
var hudName = document.querySelector('#hud-name');
var hudScore = document.querySelector('#hud-score');
var fullscreenToggle = document.querySelector('#fullscreen');
var score = 0;

nameInput.addEventListener('input', function () {
  hudName.innerHTML = nameInput.value;
}, false);

exports.onScore = function (points) {
  score += points;

  hudScore.innerHTML = score;
};


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
