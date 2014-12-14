'use strict';

var hudScore = document.querySelector('#hud-score');
var score = 0;

// Score
exports.onScore = function (points) {
  score += points;

  hudScore.innerHTML = score;
};
