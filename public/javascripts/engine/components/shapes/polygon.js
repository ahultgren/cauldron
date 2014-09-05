'use strict';

var util = require('util');
var SAT = require('SAT');


var Polygon = module.exports = function Polygon () {};
util.inherits(Polygon, SAT.Polygon);


Polygon.prototype.isPolygon = true;

Polygon.prototype.init = function(entity) {
  this.constructor.super_.call(this, new SAT.V(entity.data.x, entity.data.y),
    entity.data.path.map(function (point) {
      return new SAT.V(point.x, point.y);
    })
  );
};

Polygon.prototype.update = function(entity) {
  this.pos.x = entity.data.x;
  this.pos.y = entity.data.y;
};
