'use strict';

/**
 * An entity has an angle and an acceleration.
 * It might also have an initial speed and a maximum speed.
 * Move it. Faster and faster. Or slower if you're of that mind.
 */

exports.create = function () {
  return exports;
};

exports.init = function (entity) {
  entity.data.maxSpeed = entity.data.maxSpeed || Infinity;
  entity.data.initialSpeed = entity.data.initialSpeed || 0;
  entity.data.speed = entity.data.initialSpeed;
};

exports.update = function (entity) {
  if(entity.data.speed < entity.data.maxSpeed) {
    entity.data.speed *= entity.data.acc;
    entity.data.dx = Math.cos(entity.data.a) * entity.data.speed;
    entity.data.dy = Math.sin(entity.data.a) * entity.data.speed;
  }

  entity.data.x += entity.data.dx;
  entity.data.y += entity.data.dy;
};
