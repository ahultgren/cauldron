'use strict';

var util = require('util');
var Component = require('../Component');
var defaults = {
  start: Math.PI * 0.25,
  end: 1.75 * Math.PI
};


var Graphics = module.exports = exports = function Graphics (settings) {
  this.constructor.super_.call(this, defaults, settings);
};

util.inherits(Graphics, Component);


Graphics.prototype.type_ = 'masked';

Graphics.prototype.draw = function(entity, ctx) {
  ctx.beginPath();
  ctx.fillStyle = entity.data.fill;
  ctx.arc(0, 0, entity.data.radius, this.start, this.end, false);
  ctx.lineTo(0, 0);
  ctx.fill();
};
