'use strict';

var Physics = module.exports = exports;

Physics.create = function () {
  return Physics;
};

Physics.update = function(entity) {
  entity.data.dx *= entity.data.friction;
  entity.data.dy *= entity.data.friction;

  entity.data.x += entity.data.dx;
  entity.data.y += entity.data.dy;
};
