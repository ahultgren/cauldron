'use strict';

// [TODO] Use some kind of framework

var nameInput = document.querySelector('#player-name');
var hudName = document.querySelector('#hud-name');
var hudScore = document.querySelector('#hud-score');
var score = 0;

nameInput.addEventListener('input', function () {
  hudName.innerHTML = nameInput.value;
}, false);

exports.onScore = function (points) {
  score += points;

  hudScore.innerHTML = score;
};
