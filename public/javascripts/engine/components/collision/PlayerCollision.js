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

Collision.update = function() {};
Collision.remove = function() {};

/* Private
============================================================================= */

function onCollision (entity, type, target) {
  var isAmmo = target && target.data.isAmmo_;
  var isSelf = target && target.data.playerId === entity.data.playerId;

  if(isAmmo && !isSelf) {
    entity.mediator.emit('hit', type, target);
    target.data.player.mediator.emit('hitEnemyPlayer', entity);
  }
}
