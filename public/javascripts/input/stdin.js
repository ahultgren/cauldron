'use strict';

/**
 * I think the point of this module is to represent a standard input, which in
 * the world of games is mouse and keyboard, but abstract away the actual inputs
 * so that they can be replaced by imitiating modules, like remote peers.
 * I think. At least it sounds cool.
 */

var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    utils = require('../utils'),
    keyboard = require('./keyboard'),
    mouse = require('./mouse');


var Stdin = module.exports = function (settings) {
  utils.extend(this, {
    keyboard: keyboard,
    mouse: mouse,
    keymap: {
      left: 'a',
      right: 'd',
      up: 'w',
      down: 's'
    }
  }, settings);

  if(this.mouse.on) {
    this.mouse.on('mousedown', this.emit.bind(this, 'mousedown'));
  }
};

util.inherits(Stdin, EventEmitter);

Stdin.prototype.isDown = function (key) {
  return this.keyboard[this.keymap[key]];
};

Stdin.prototype.getPosition = function (axis) {
  return this.mouse[axis];
};
