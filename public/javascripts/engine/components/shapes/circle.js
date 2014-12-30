'use strict';

var SAT = require('SAT');
var Circle = module.exports = exports;

Circle.create = function () {
  return Circle;
};

Circle.init = function(entity) {
  var pos = new SAT.V(entity.data.x, entity.data.y);

  entity.data.shape = new SAT.Circle(pos, entity.data.radius);
  entity.data.shape.isCircle = true;
};

Circle.update = function(entity) {
  entity.data.shape.pos.x = entity.data.x;
  entity.data.shape.pos.y = entity.data.y;
};

Circle.remove = function(){};
