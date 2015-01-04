'use strict';

var Entity = require('../entity');
var ExplosionGraphics = require('../graphics/ExplosionGraphics');
var defaultEplosionGradient = [
  '#f00',
  '#f77',
  '#faa',
  '#fcc',
  '#fff'
];

var Collision = module.exports = exports;

Collision.type_ = 'collidable';
Collision.response_ = 'none';
Collision.boundingBox_ = 'polygon';

Collision.create = function () {
  return Collision;
};

Collision.init = function(entity) {
  entity.mediator.on('collision', onCollision);

  entity.data.collisionType_ = Collision.type_;
  entity.data.collisionResponse_ = Collision.response_;
  entity.data.boundingBox_ = Collision.boundingBox_;

  entity.data.explosionRadius = entity.data.explosionRadius || 2;
  entity.data.explosionDuration = entity.data.explosionDuration || 4;
  entity.data.explosionGradient = entity.data.explosionGradient || defaultEplosionGradient;
};

Collision.update = function() {};

Collision.remove = function() {};

/* Private
============================================================================= */

function onCollision (entity, type, target) {
  switch(type) {
    case 'map':
      //## Spawn small explosion?
      break;

    case 'collidable':
      if(target.data.playerId !== entity.data.playerId) {
        // [TODO] Need point of collision
        spawn(entity, target);
      }
      break;
  }
}

function spawn (entity, target) {
  var explosion = Entity.create({
    gradient: entity.data.explosionGradient,
    duration: entity.data.explosionDuration,
    x: target.data.x,
    y: target.data.y,
    radius: entity.data.explosionRadius
  })
  .addStage2Component(ExplosionGraphics.create())
  .init();

  entity.game.add(explosion);
}
