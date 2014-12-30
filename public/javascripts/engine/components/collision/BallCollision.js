'use strict';

var util = require('util');
var Component = require('../Component');
var Entity = require('../Entity.v2');
var ExplosionGraphics = require('../graphics/ExplosionGraphics');


var Collision = module.exports = function BallCollision (settings) {
  this.constructor.super_.call(this, {}, settings);
};

util.inherits(Collision, Component);


Collision.create = function (settings) {
  return new Collision(settings);
};

Collision.prototype.type_ = 'collidable';
Collision.prototype.response_ = 'obstaclePhobic';
Collision.prototype.boundingBox_ = 'circle';

Collision.prototype.init = function(entity) {
  entity.mediator.on('collision', this.onCollision.bind(this));
};

Collision.prototype.update = function() {};

Collision.prototype.onCollision = function(entity, type, target) {
  switch(type) {
    case 'map':
      this.spawn_(entity);
      entity.remove();
      break;

    case 'collidable':
      if(target.data.playerId !== entity.data.playerId) {
        this.spawn_(entity);
        entity.remove();
      }
      break;
  }
};


/* Private
============================================================================= */

Collision.prototype.spawn_ = function(entity) {
  var explosion = Entity.create({
    duration: entity.data.explosionDuration,
    x: entity.data.x,
    y: entity.data.y,
    radius: entity.data.radius
  })
  .addStage2Component(ExplosionGraphics.create())
  .init();

  this.game.add(explosion);
};
