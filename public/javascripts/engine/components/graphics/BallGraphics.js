'use strict';

var util = require('util');
var Component = require('../Component');


var Graphics = module.exports = function BallGraphics (settings) {
  this.constructor.super_.call(this, {}, settings);
};

util.inherits(Graphics, Component);


Graphics.prototype.draw = function(entity, ctx) {
  ctx.beginPath();
  ctx.arc(entity.x, entity.y, entity.size, 0, Math.PI * 2);
  ctx.fillStyle = entity.fill;
  ctx.fill();
};
