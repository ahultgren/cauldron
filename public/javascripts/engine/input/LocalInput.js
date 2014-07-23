'use strict';

/**
 * I think the point of this module is to represent a standard input, which in
 * the world of games is mouse and keyboard, but abstract away the actual inputs
 * so that they can be replaced by imitiating modules, like remote peers.
 * I think. At least it sounds cool.
 */

var util = require('util');
var InputInterface = require('./InputInterface');
var defaults = {
  keyboard: require('./keyboard'),
  mouse: require('./mouse'),
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

util.inherits(LocalInput, InputInterface);


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
