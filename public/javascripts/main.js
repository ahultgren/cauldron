'use strict';

var Game = require('./engine');
var map1 = require('./maps/one');
var ui = require('./ui');

var game = new Game({
  map: map1,
  canvas: document.querySelector('#canvas')
});

window.onload = function () {
  game.start();

  game.network.on('ready', function () {
    game.network.connectToAllPeers();
  });
};

// Score
game.playerOne.on('hitEnemyPlayer', function () {
  ui.score.onScore(100);
});

game.playerOne.on('hit', function () {
  ui.score.onScore(-50);
});
