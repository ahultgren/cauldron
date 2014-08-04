'use strict';

var util = require('util');
var Component = require('../Component');


var Graphics = module.exports = function PowerupGraphics (settings) {
  this.constructor.super_.call(this, {}, settings);
};

util.inherits(Graphics, Component);


Graphics.prototype.type_ = 'masked';

Graphics.prototype.draw = function(entity, ctx) {
  ctx.beginPath();
  ctx.arc(entity.x, entity.y, entity.radius, 0, Math.PI * 2);
  ctx.strokeStyle = entity.stroke;
  ctx.lineWidth = entity.strokeWidth;
  ctx.stroke();

  //## Use this to easily variate between different powerups
  ctx.beginPath();
  ctx.arc(entity.x, entity.y, entity.radius + entity.strokeWidth*2, 0, Math.PI * 2);
  ctx.strokeStyle = '#990';
  ctx.stroke();
};
