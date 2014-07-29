'use strict';

var util = require('util');
var Component = require('../Component');


var Physics = module.exports = exports = function Physics (settings) {
  this.constructor.super_.call(this, {}, settings);
  // this.map
};

util.inherits(Physics, Component);


Physics.prototype.update = function(entity) {
  entity.lastPos = {
    x: entity.x,
    y: entity.y
  };

  entity.dx *= entity.friction;
  entity.dy *= entity.friction;

  entity.x += entity.dx;
  entity.y += entity.dy;
};
