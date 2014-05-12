'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var canvas = require('../canvas');


var Mouse = function () {
  var self = this;

  this.x = canvas.width/2;
  this.y = canvas.height/2;

  canvas.addEventListener('mousemove', function (e) {
    self.x = e.layerX;
    self.y = e.layerY;
  }, false);

  window.addEventListener('mousedown', this.emit.bind(this, 'mousedown'), false);
  window.addEventListener('mouseup', this.emit.bind(this, 'mouseup'), false);
};

util.inherits(Mouse, EventEmitter);

module.exports = new Mouse();
