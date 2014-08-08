'use strict';

var util = require('util');
var Component = require('../Component');
var defaults = {};


var Graphics = module.exports = exports = function Graphics (settings) {
  this.constructor.super_.call(this, defaults, settings);
};

util.inherits(Graphics, Component);


Graphics.prototype.type_ = 'masked';

Graphics.prototype.draw = function(entity, ctx) {
  ctx.beginPath();
  ctx.arc(entity.data.x, entity.data.y, entity.data.radius, entity.data.a + 0.5, entity.data.a + Math.PI + 0.5, false);
  ctx.fillStyle = entity.data.fill;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(entity.data.x, entity.data.y, entity.data.radius, entity.data.a + 0.75 * Math.PI, entity.data.a + 1.75 * Math.PI, false);
  ctx.fill();
};
