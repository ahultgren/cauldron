'use strict';

var util = require('util');
var Component = require('../Component');


var Physics = module.exports = function BallPhysics (settings) {
  this.constructor.super_.call(this, {
    animateFor: 5
  }, settings);
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

  entity.x += Math.cos(angle) * (entity.radius + 1);
  entity.y += Math.sin(angle) * (entity.radius + 1);

  entity.lastPos = {
    x: entity.x,
    y: entity.y
  };

  entity.collision.on('obstacle', this.onCollision_.bind(this));
};

Physics.prototype.update = function(entity) {
  if(!this.collided) {
    entity.lastPos.x = entity.x;
    entity.lastPos.y = entity.y;

    // Move only until collided
    entity.x += this.dx;
    entity.y += this.dy;
  }
  else if(this.dieIn && !entity.stopCollisionTests_) {
    entity.stopCollisionTests_ = true;
  }
  else if(!(this.dieIn--)) {
    // Allow to show some effect for a while, then die
    entity.remove_ = true;
  }
};


/* Private
============================================================================= */

Physics.prototype.onCollision_ = function() {
  this.collided = true;
  this.dieIn = this.animateFor;
};
