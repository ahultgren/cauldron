'use strict';

var util = require('util');
var Component = require('../Component');


var Physics = module.exports = function RocketPhysics (settings) {
  this.constructor.super_.call(this, {}, settings);
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

  entity.data.dx = Math.cos(angle) * entity.data.initialSpeed;
  entity.data.dy = Math.sin(angle) * entity.data.initialSpeed;
  this.speed = entity.data.initialSpeed;

  entity.data.a = angle;
};

Physics.prototype.update = function(entity) {
  if(this.speed < entity.data.maxSpeed) {
    this.speed *= entity.data.acc;
    entity.data.dx = Math.cos(entity.data.a) * this.speed;
    entity.data.dy = Math.sin(entity.data.a) * this.speed;
  }

  entity.data.x += entity.data.dx;
  entity.data.y += entity.data.dy;
};