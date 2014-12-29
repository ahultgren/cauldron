'use strict';

var util = require('util');
var Component = require('../Component');
var Entity = require('../Entity.v2');
var ExplosionGraphics = require('../graphics/ExplosionGraphics');


var Collision = module.exports = function BeamCollision (settings) {
  this.constructor.super_.call(this, {
    explosionRadius: 2,
    explosionDuration: 4,
    explosionGradient: [
      '#f00',
      '#f77',
      '#faa',
      '#fcc',
      '#fff'
    ]
  }, settings);
};

util.inherits(Collision, Component);


Collision.prototype.type_ = 'collidable';
Collision.prototype.response_ = 'none';
Collision.prototype.boundingBox_ = 'polygon';

Collision.prototype.init = function(entity) {
  entity.mediator.on('collision', this.onCollision.bind(this));
};

Collision.prototype.update = function() {};

Collision.prototype.onCollision = function(entity, type, target) {
  switch(type) {
    case 'map':
      //## Spawn small explosion?
      break;

    case 'collidable':
      if(target.data.playerId !== entity.data.playerId) {
        // [TODO] Need point of collision
        this.spawn_(entity, target);
      }
      break;
  }
};


/* Private
============================================================================= */

Collision.prototype.spawn_ = function(entity, target) {
  var explosion = Entity.create({
    gradient: this.explosionGradient,
    duration: this.explosionDuration,
    x: target.data.x,
    y: target.data.y,
    radius: this.explosionRadius
  })
  .addStage2Component(ExplosionGraphics.create())
  .init();

  this.game.add(explosion);
};
