'use strict';

var util = require('util');
var Component = require('../Component');
var Entity = require('../Entity');
var ExplosionGraphics = require('../graphics/ExplosionGraphics');


var Physics = module.exports = function BallPhysics (settings) {
  this.constructor.super_.call(this, {
    explosionDuration: 5
  }, settings);
};

util.inherits(Physics, Component);


Physics.prototype.init = function(entity) {
  var angle;

  //## Is it right/better to cheat like this?
  this.entity = entity;

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

  entity.collision.on('obstacle', this.onCollision_.bind(this, 'obstacle'));
  entity.collision.on('collidable', this.onCollision_.bind(this, 'collidable'));
};

Physics.prototype.update = function(entity) {
  if(!this.collided) {
    entity.lastPos.x = entity.x;
    entity.lastPos.y = entity.y;

    // Move only until collided
    entity.x += this.dx;
    entity.y += this.dy;
  }
  else {
    this.game.add(new Entity({
      type_: 'masked',
      x: entity.x,
      y: entity.y,
      radius: entity.radius,
      graphics: new ExplosionGraphics({
        duration: this.explosionDuration
      })
    }));

    entity.remove();
  }
};


/* Private
============================================================================= */

Physics.prototype.onCollision_ = function(type, response) {
  switch (type) {
    case 'obstacle':
      this.collided = true;
      break;

    case 'collidable':
      if(response.weapon !== this.entity.weapon) {
        this.collided = true;
      }
      break;
  }
};
