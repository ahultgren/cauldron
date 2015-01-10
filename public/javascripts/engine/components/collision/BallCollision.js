'use strict';

var Collision = module.exports = exports;

Collision.type_ = 'collidable';
Collision.response_ = 'obstaclePhobic';
Collision.boundingBox_ = 'circle';

Collision.create = function () {
  return Collision;
};

Collision.init = function(entity) {
  entity.mediator.on('collision', onCollision);

  entity.data.collisionType_ = Collision.type_;
  entity.data.collisionResponse_ = Collision.response_;
  entity.data.boundingBox_ = Collision.boundingBox_;
};

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
  entity.game.factories.explosion({
    duration: entity.data.explosionDuration,
    x: entity.data.x,
    y: entity.data.y,
    radius: entity.data.radius
  });
}
