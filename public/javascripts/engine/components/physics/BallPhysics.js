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

  entity.data.dx = Math.cos(angle) * entity.data.speed;
  entity.data.dy = Math.sin(angle) * entity.data.speed;

  entity.data.x += Math.cos(angle) * (entity.data.radius + 1);
  entity.data.y += Math.sin(angle) * (entity.data.radius + 1);
};

Physics.update = function(entity) {
  entity.data.x += entity.data.dx;
  entity.data.y += entity.data.dy;
};
