'use strict';

var Game = require('./engine'),
    map1 = require('./maps/one');

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
