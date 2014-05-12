'use strict';

var Game = require('./engine'),
    map1 = require('./maps/one');

module.exports = new Game({
  map: map1,
  canvas: document.querySelector('#canvas')
});

window.onload = function () {
  module.exports.start();
};
