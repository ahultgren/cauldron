'use strict';

/**
 * An entity has an angle and a speed. Just keep it moving.
 */

exports.create = function () {
  return exports;
};

exports.init = function (entity) {
  // Calculate velocity
  if(entity.data.speed) {
    entity.data.dx = Math.cos(entity.data.a) * entity.data.speed;
    entity.data.dy = Math.sin(entity.data.a) * entity.data.speed;
  }
};

exports.update = function (entity) {
  entity.data.x += entity.data.dx;
  entity.data.y += entity.data.dy;
};
