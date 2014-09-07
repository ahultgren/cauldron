'use strict';

var AABB = module.exports = function AABB () {
  this.halfWidth = 0;
  this.halfHeight = 0;
  this.x = 0;
  this.y = 0;
};


AABB.prototype.init = function(entity) {
  this.halfWidth = this.halfHeight = entity.data.influenceArea || entity.data.radius || 0;
  this.update(entity);
};

AABB.prototype.update = function(entity) {
  this.x = entity.data.x;
  this.y = entity.data.y;
};
