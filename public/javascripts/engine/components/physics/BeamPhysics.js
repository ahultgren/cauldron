'use strict';

var utils = require('../../utils');
var Physics = module.exports = exports;

Physics.create = function () {
  return Physics;
};

Physics.init = function(entity) {
  // Allow for setting a and b
  if(!entity.data.b) {
    makeLine(entity);
  }

  // Generate aabb-data
  entity.data.halfWidth = Math.abs(entity.data.path[0].x - entity.data.path[1].x)/2;
  entity.data.halfHeight = Math.abs(entity.data.path[0].y - entity.data.path[1].y)/2;

  entity.data.aabbX = Math.min(entity.data.path[0].x, entity.data.path[1].x) + entity.data.halfWidth;
  entity.data.aabbY = Math.min(entity.data.path[0].y, entity.data.path[1].y) + entity.data.halfHeight;
};

/* Private
============================================================================= */

function makeLine (entity) {
  var i, l, intersection, minIntersection, angle, line;

  angle = Math.atan2(entity.data.toward.y - entity.data.from.data.y, entity.data.toward.x - entity.data.from.data.x);

  // Accuracy
  angle = angle + entity.data.spread;

  // Start with a really long line...
  entity.data.path = line = [
    {
      x: entity.data.from.data.x + Math.cos(angle)*5,
      y: entity.data.from.data.y + Math.sin(angle)*5
    },
    {
      x: entity.data.from.data.x + Math.cos(angle)*1000000,
      y: entity.data.from.data.y + Math.sin(angle)*1000000
    }
  ];

  // ...find the closest intersecting map segment...
  for(i = 0, l = entity.data.mapPaths.length; i < l; i++) {
    intersection = utils.getIntersection(line, entity.data.mapPaths[i]);

    if(!minIntersection && intersection || minIntersection && intersection && intersection.param < minIntersection.param) {
      minIntersection = intersection;
    }
  }

  // ...and shorten the line
  line[1].x = minIntersection.x;
  line[1].y = minIntersection.y;
}
