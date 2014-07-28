'use strict';

var util = require('util');
var Component = require('../Component');


var Physics = module.exports = function BallPhysics (settings) {
  this.constructor.super_.call(this, {}, settings);
};

util.inherits(Physics, Component);


Physics.prototype.init = function(entity) {
  var angle;

  // Set position
  entity.x = entity.from.x;
  entity.y = entity.from.y;

  // Calculate velocity
  angle = Math.atan2(entity.toward.y - entity.from.y, entity.toward.x - entity.from.x);
  angle += entity.spread;

  this.dx = Math.cos(angle) * entity.speed;
  this.dy = Math.sin(angle) * entity.speed;

  entity.x += this.dx;
  entity.y += this.dy;
};

Physics.prototype.update = function(entity) {
  // Move
  if(!this.stopped) {
    entity.x += this.dx;
    entity.y += this.dy;
  }

  // If colliding with wall or player
  if(this.collisionTest_(entity)) {
    // Stop moving
    // Flash for n frames (or just spawn an effect?)
      // Then set remove-flag
  }
};


/* Private
============================================================================= */

Physics.prototype.collisionTest_ = function(entity) {
  void(entity);
};
