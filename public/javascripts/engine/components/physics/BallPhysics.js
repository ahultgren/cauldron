'use strict';

var Physics = module.exports = exports;

Physics.create = function () {
  return Physics;
};

Physics.init = function(entity) {
  var angle = entity.data.a;

  // Set position
  entity.data.x = entity.data.from.data.x;
  entity.data.y = entity.data.from.data.y;

  entity.data.x += Math.cos(angle) * (entity.data.radius + 1);
  entity.data.y += Math.sin(angle) * (entity.data.radius + 1);
};
