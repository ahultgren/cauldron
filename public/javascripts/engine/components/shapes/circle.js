'use strict';

var util = require('util');
var SAT = require('SAT');


var Circle = module.exports = function Circle () {};
util.inherits(Circle, SAT.Circle);


Circle.prototype.isCircle = true;

Circle.prototype.init = function(entity) {
  var pos = new SAT.V(entity.data.x, entity.data.y);
  this.constructor.super_.call(this, pos, entity.data.radius);
};

Circle.prototype.update = function(entity) {
  this.pos.x = entity.data.x;
  this.pos.y = entity.data.y;
};
