'use strict';

var Collision = module.exports = exports;

Collision.type_ = 'obstacle';
Collision.response_ = 'zone';
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
  if(target.data.isPlayer_) {
    target.mediator.emit('addPowerup', {
      type: entity.data.powerupType,
      data: entity.data.powerupData
    });

    entity.remove();
  }
}
