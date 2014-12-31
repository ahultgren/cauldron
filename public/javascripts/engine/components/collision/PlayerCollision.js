'use strict';

var Collision = module.exports = exports;

Collision.type_ = 'collidable';
Collision.response_ = 'obstaclePhobic';
Collision.boundingBox_ = 'circle';

Collision.create = function () {
  return Collision;
};

Collision.init = function(enitity) {
  enitity.mediator.on('collision', onCollision);
};

Collision.update = function() {};
Collision.remove = function() {};

/* Private
============================================================================= */

function onCollision (entity, type, target) {
  var isAmmo = target && target.data.isAmmo_;
  var isSelf = target && target.data.playerId === entity.data.playerId;

  if(isAmmo && !isSelf) {
    entity.emit('hit', type, target);
    target.weapon.player.emit('hitEnemyPlayer', entity);
  }
}
