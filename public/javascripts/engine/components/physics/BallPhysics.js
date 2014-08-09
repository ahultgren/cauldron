'use strict';

var util = require('util');
var Component = require('../Component');


var Physics = module.exports = function BallPhysics (settings) {
  this.constructor.super_.call(this, {
    explosionDuration: 5
  }, settings);
};

util.inherits(Physics, Component);


Physics.prototype.init = function(entity) {
  var angle;

  // Set position
  entity.data.x = entity.from.data.x;
  entity.data.y = entity.from.data.y;

  // Calculate velocity
  angle = Math.atan2(entity.toward.y - entity.from.data.y, entity.toward.x - entity.from.data.x);
  angle += entity.data.spread;

  this.dx = Math.cos(angle) * entity.data.speed;
  this.dy = Math.sin(angle) * entity.data.speed;

  entity.data.x += Math.cos(angle) * (entity.data.radius + 1);
  entity.data.y += Math.sin(angle) * (entity.data.radius + 1);
};

Physics.prototype.update = function(entity) {
  entity.data.x += this.dx;
  entity.data.y += this.dy;
};
