'use strict';

/**
 * Slow down, cowboy.
 */

exports.create = function () {
  return exports;
};

exports.update = function(entity) {
  entity.data.dx *= entity.data.friction;
  entity.data.dy *= entity.data.friction;
};
