'use strict';

var Entity = require('../Entity.v2');
var ExplosionGraphics = require('../graphics/ExplosionGraphics');
var Collision = module.exports = exports;

Collision.type_ = 'collidable';
Collision.response_ = 'obstaclePhobic';
Collision.boundingBox_ = 'circle';

Collision.create = function () {
  return Collision;
};

Collision.init = function(entity) {
  entity.mediator.on('collision', onCollision);
};

Collision.update = function() {};

Collision.remove = function() {};

/* Private
============================================================================= */

function onCollision (entity, type, target) {
  switch(type) {
    case 'map':
      spawn(entity);
      entity.remove();
      break;

    case 'collidable':
      if(target.data.playerId !== entity.data.playerId) {
        spawn(entity);
        entity.remove();
      }
      break;
  }
}

function spawn (entity) {
  var explosion = Entity.create({
    duration: entity.data.explosionDuration,
    x: entity.data.x,
    y: entity.data.y,
    radius: entity.data.radius
  })
  .addStage2Component(ExplosionGraphics.create())
  .init();

  entity.game.add(explosion);
}
