'use strict';

var AABB = module.exports = exports;

AABB.create = function () {
  return AABB;
};

AABB.init = function(entity) {
  entity.data.halfWidth = entity.data.halfWidth || entity.data.radius || 0;
  entity.data.halfHeight = entity.data.halfHeight || entity.data.radius || 0;

  // [TODO] Clean this shit up
  if(!entity.data.aabbX) {
    entity.data.stalkXY = true;
  }

  entity.data.aabbX = entity.data.aabbX || 0;
  entity.data.aabbY = entity.data.aabbY || 0;

  AABB.update(entity);
};

AABB.update = function(entity) {
  if(entity.data.stalkXY) {
    entity.data.aabbX = entity.data.x;
    entity.data.aabbY = entity.data.y;
  }
};
