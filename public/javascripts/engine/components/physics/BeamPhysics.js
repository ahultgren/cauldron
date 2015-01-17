'use strict';

var utils = require('../../utils');
var Physics = module.exports = exports;

Physics.create = function () {
  return Physics;
};

Physics.init = function(entity) {
  var line = makeLine(entity);

  // Generate aabb-data
  entity.data.halfWidth = Math.abs(line[0].x - line[1].x)/2;
  entity.data.halfHeight = Math.abs(line[0].y - line[1].y)/2;
  entity.data.aabbX = Math.min(line[0].x, line[1].x) + entity.data.halfWidth;
  entity.data.aabbY = Math.min(line[0].y, line[1].y) + entity.data.halfHeight;

  var xLength = entity.data.halfWidth * 2;
  var yLength = entity.data.halfHeight * 2;
  var xPow = Math.pow(xLength, 2);
  var yPow = Math.pow(yLength, 2);

  entity.data.lineEnd = {
    x: Math.sqrt(xPow + yPow),
    y: 0
  };
};

/* Private
============================================================================= */

function makeLine (entity) {
  var i, l, intersection, minIntersection, angle, line;

  angle = entity.data.a;

  // Start with a really long line...
  line = [
    {
      x: entity.data.from.data.x,
      y: entity.data.from.data.y
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

  return line;
}
