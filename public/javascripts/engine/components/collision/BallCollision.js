'use strict';

var util = require('util');
var Component = require('../Component');
var Entity = require('../Entity');
var ExplosionGraphics = require('../graphics/ExplosionGraphics');


var Collision = module.exports = function BallCollision (settings) {
  this.constructor.super_.call(this, {}, settings);
};

util.inherits(Collision, Component);

Collision.prototype.response_ = 'obstaclePhobic';


Collision.prototype.update = function() {};

Collision.prototype.onCollision = function(entity, type, target) {
  switch(type) {
    case 'obstacle':
      this.spawn_(entity);
      entity.remove();
      break;

    case 'collidable':
      if(target.weapon !== entity.weapon) {
        this.spawn_(entity);
        entity.remove();
      }
      break;
  }
};


/* Private
============================================================================= */

Collision.prototype.spawn_ = function(entity) {
  this.game.add(new Entity({
    type_: 'masked',
    x: entity.x,
    y: entity.y,
    radius: entity.radius,
    graphics: new ExplosionGraphics({
      duration: entity.explosionDuration
    })
  }));
};
