'use strict';

var util = require('util');
var Component = require('../Component');


var Physics = module.exports = exports = function Physics (settings) {
  this.constructor.super_.call(this, {}, settings);
  // this.map
};

util.inherits(Physics, Component);


Physics.prototype.update = function(entity) {
  entity.data.dx *= entity.data.friction;
  entity.data.dy *= entity.data.friction;

  entity.data.x += entity.data.dx;
  entity.data.y += entity.data.dy;
};
