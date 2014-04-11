'use strict';

var canvas = require('./canvas');


var Game = function () {
  var self = this;

  self.loop = new (require('./loop'))();
  self.map = new (require('./map'))(self, canvas);
  self.playerOne = new (require('./player'))(self, canvas.width/2, canvas.height/2);
  self.cursor = new (require('./cursor'))(self);

  window.onload = function () {
    self.loop.alwaysVisible.push(self.map);
    self.loop.start(self);
  };
};

module.exports = new Game();
