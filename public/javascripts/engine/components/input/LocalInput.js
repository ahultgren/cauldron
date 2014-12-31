'use strict';

var util = require('util');
var Component = require('../Component');
var R = require('ramda');
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
};

util.inherits(LocalInput, Component);

LocalInput.create = function (settings) {
  return new LocalInput(settings);
};

LocalInput.prototype.init = function(entity) {
  var emit = R.curryN(2, R.lPartial(R.bind(entity.mediator.emit, entity.mediator)));

  if(this.mouse.on) {
    this.mouse.on('mousedown', emit('inputmousedown'));
    this.mouse.on('mouseup', emit('inputmouseup'));
  }
};

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
