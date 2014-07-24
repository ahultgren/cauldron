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


LocalInput.prototype.isDown = function (key) {
  return this.keyboard[this.keymap[key]];
};

LocalInput.prototype.getPosition = function (axis) {
  return this.mouse[axis];
};

LocalInput.prototype.update = function(entity) {
  entity.dx += this.isDown('left') && -entity.acc || this.isDown('right') && entity.acc || 0;
  entity.dy += this.isDown('up') && -entity.acc || this.isDown('down') && entity.acc || 0;

  entity.a = Math.atan2(this.getPosition('y')-entity.y, this.getPosition('x')-entity.x);
};
