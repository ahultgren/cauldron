'use strict';

var utils = require('../../utils');
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
  utils.extend(this, defaults, settings);
};

LocalInput.create = function (settings) {
  return new LocalInput(settings);
};

LocalInput.prototype.init = function(entity) {
  var emitOnMediator = R.curryN(2, R.lPartial(R.bind(entity.mediator.emit, entity.mediator)));

  entity.data.mouse = this.mouse = entity.data.mouse || this.mouse;

  this.mouse.on('mousedown', function () {
    entity.mediator.emit('triggerStart', entity, entity.data.mouse, entity.data.spread);
  });
  this.mouse.on('mouseup', emitOnMediator('triggerEnd'));
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
