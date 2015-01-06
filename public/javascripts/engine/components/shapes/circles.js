'use strict';

var SAT = require('SAT');
var R = require('ramda');
var largestRadius = R.compose(R.max, R.map(R.prop('radius')));
var DEFAULT_CIRCLES = [
  {
    stroke: '#2d0',
    radius: 10,
    strokeWidth: 2
  },
  {
    stroke: '#af0',
    radius: 14,
    strokeWidth: 2
  }
];

var Circles = module.exports = exports;

Circles.create = function () {
  return Circles;
};

Circles.init = function(entity) {
  var pos = new SAT.V(entity.data.x, entity.data.y);

  entity.data.shape = new SAT.Circle(pos, entity.data.radius);
  entity.data.shape.isCircle = true;
  entity.data.concircles = entity.data.concircles || DEFAULT_CIRCLES;
  entity.data.radius = entity.data.radius || largestRadius(entity.data.concircles);
};

Circles.update = function(entity) {
  entity.data.shape.pos.x = entity.data.x;
  entity.data.shape.pos.y = entity.data.y;
  entity.data.shape.r = entity.data.radius;
};

Circles.remove = function(){};
