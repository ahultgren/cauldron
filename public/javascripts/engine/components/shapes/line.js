'use strict';

var util = require('util');
var SAT = require('SAT');


var Line = module.exports = function Line () {};
util.inherits(Line, SAT.Polygon);


Line.prototype.isPolygon = true;

Line.prototype.init = function(entity) {
  this.constructor.super_.call(this, new SAT.V(entity.data.x || 0, entity.data.y || 0),
    entity.data.path.map(function (point) {
      return new SAT.V(point.x, point.y);
    })
  );
};

Line.prototype.update = function(entity) {
  this.pos.x = entity.data.x || 0;
  this.pos.y = entity.data.y || 0;
};
