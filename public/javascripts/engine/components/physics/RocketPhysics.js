'use strict';

var Physics = module.exports = exports;

Physics.create = function () {
  return Physics;
};

Physics.init = function(entity) {
  var angle;

  // Set position
  entity.data.x = entity.data.from.data.x;
  entity.data.y = entity.data.from.data.y;

  // Calculate velocity
  angle = Math.atan2(entity.data.toward.y - entity.data.from.data.y, entity.data.toward.x - entity.data.from.data.x);
  angle += entity.data.spread;

  entity.data.dx = Math.cos(angle) * entity.data.initialSpeed;
  entity.data.dy = Math.sin(angle) * entity.data.initialSpeed;
  entity.data.speed = entity.data.initialSpeed;

  entity.data.a = angle;
};

Physics.update = function(entity) {
  if(entity.data.speed < entity.data.maxSpeed) {
    entity.data.speed *= entity.data.acc;
    entity.data.dx = Math.cos(entity.data.a) * entity.data.speed;
    entity.data.dy = Math.sin(entity.data.a) * entity.data.speed;
  }

  entity.data.x += entity.data.dx;
  entity.data.y += entity.data.dy;
};
