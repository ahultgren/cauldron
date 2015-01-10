'use strict';

var SAT = require('SAT');
var Polygon = module.exports = exports;

Polygon.create = function () {
  return Polygon;
};

Polygon.init = function(entity) {
  var path = entity.data.path.map(function (point) {
    return new SAT.V(point.x, point.y);
  });

  entity.data.shape = new SAT.Polygon(new SAT.V(entity.data.x, entity.data.y), path);
  entity.data.shape.isPolygon = true;
};

Polygon.update = function(entity) {
  entity.data.shape.pos.x = entity.data.x;
  entity.data.shape.pos.y = entity.data.y;
};
