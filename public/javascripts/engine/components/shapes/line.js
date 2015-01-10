'use strict';

var SAT = require('SAT');
var Line = module.exports = exports;

Line.create = function () {
  return Line;
};

Line.init = function(entity) {
  var origin = new SAT.V(entity.data.x || 0, entity.data.y || 0);
  var path = entity.data.path.map(function (point) {
    return new SAT.V(point.x, point.y);
  });

  entity.data.shape = new SAT.Polygon(origin, path);
  entity.data.shape.isPolygon = true;
};

Line.update = function(entity) {
  entity.data.shape.pos.x = entity.data.x || 0;
  entity.data.shape.pos.y = entity.data.y || 0;
};
