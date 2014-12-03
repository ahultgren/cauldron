'use strict';

var AABB = module.exports = function AABB () {
  this.halfWidth = 0;
  this.halfHeight = 0;
  this.x = 0;
  this.y = 0;
};


AABB.prototype.init = function(entity) {
  this.halfWidth = entity.data.halfWidth || entity.data.radius || 0;
  this.halfHeight = entity.data.halfHeight || entity.data.radius || 0;
  this.update(entity);
};

AABB.prototype.update = function(entity) {
  this.x = entity.data.aabbX || entity.data.x || 0;
  this.y = entity.data.aabbY || entity.data.y || 0;
};
