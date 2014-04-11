'use strict';

var Game = require('./game'),
    map1 = require('./maps/one');

module.exports = new Game(map1);

window.onload = function () {
  module.exports.start();
};
