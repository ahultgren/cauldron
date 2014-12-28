'use strict';

var SAT = require('sat');


exports.type_ = 'masked';

exports.create = function () {
  return exports;
};

exports.init = function(entity) {
  var map = entity.data.paths;

  // Add map borders
  map.unshift(
    [{x: 0, y: 0}, {x: map.width, y: 0}],
    [{x: map.width, y: 0}, {x: map.width, y: map.height}],
    [{x: map.width, y: map.height}, {x: 0, y: map.height}],
    [{x: 0, y: map.height}, {x: 0, y: 0}]
  );

  // Alias for paths
  entity.data.map = map;

  // Expose height and width
  entity.data.width = map.width;
  entity.data.height = map.height;

  createAabb(map);
  createShape(map);

  entity.data.gco_ = exports.type_;
};

exports.update = function(entity, ctx) {
  var paths = entity.data.paths;
  var i, l, path;

  ctx.strokeStyle = '#c33';
  ctx.lineWidth = 2;
  ctx.beginPath();

  for(i = 0, l = paths.length; i < l; i++) {
    path = paths[i];
    ctx.moveTo(path[0].x, path[0].y);
    ctx.lineTo(path[1].x, path[1].y);
  }

  ctx.stroke();
};

/* Private
============================================================================= */

/**
 * Create an AABB for each map segment
 */
function createAabb (paths) {
  paths.forEach(function (path) {
    path.aabb = {
      x: Math.abs(path[0].x + path[1].x)/2,
      y: Math.abs(path[0].y + path[1].y)/2,
      halfWidth: Math.abs(path[0].x - path[1].x)/2,
      halfHeight: Math.abs(path[0].y - path[1].y)/2
    };
  });
}

/**
 * Create an instance of SAT.Polygon as .line on each segment
 */
function createShape (paths) {
  paths.forEach(function (path) {
    path.line = new SAT.Polygon(new SAT.V(),
      [new SAT.V(path[0].x, path[0].y), new SAT.V(path[1].x, path[1].y)]);
  });
}
