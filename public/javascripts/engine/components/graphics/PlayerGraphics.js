'use strict';

var util = require('util');
var Component = require('../Component');
var defaults = {};


var Graphics = module.exports = exports = function Graphics (settings) {
  this.constructor.super_.call(this, defaults, settings);
};

util.inherits(Graphics, Component);


Graphics.prototype.draw = function(entity, ctx) {
  ctx.beginPath();
  ctx.arc(entity.x, entity.y, entity.radius, entity.a + 0.5, entity.a + Math.PI + 0.5, false);
  ctx.fillStyle = entity.fill;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(entity.x, entity.y, entity.radius, entity.a + 0.75 * Math.PI, entity.a + 1.75 * Math.PI, false);
  ctx.fill();
};
