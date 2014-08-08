'use strict';

var util = require('util');
var Component = require('../Component');
var defaults = {
  keyboard: require('../../system/keyboard'),
  mouse: require('../../system/mouse'),
  keymap: {
    left: 'a',
    right: 'd',
    up: 'w',
    down: 's'
  }
};

var LocalInput = module.exports = function LocalInput (settings) {
  this.constructor.super_.call(this, defaults, settings);

  if(this.mouse.on) {
    this.mouse.on('mousedown', this.emit.bind(this, 'mousedown'));
    this.mouse.on('mouseup', this.emit.bind(this, 'mouseup'));
  }
};

util.inherits(LocalInput, Component);


LocalInput.prototype.update = function(entity) {
  entity.data.dx += this.isDown('left') && -entity.data.acc || this.isDown('right') && entity.data.acc || 0;
  entity.data.dy += this.isDown('up') && -entity.data.acc || this.isDown('down') && entity.data.acc || 0;

  entity.data.a = Math.atan2(this.getPosition('y')-entity.data.y, this.getPosition('x')-entity.data.x);
};

LocalInput.prototype.isDown = function (key) {
  return this.keyboard[this.keymap[key]];
};

LocalInput.prototype.getPosition = function (axis) {
  return this.mouse[axis];
};
