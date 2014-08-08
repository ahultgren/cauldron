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
  ctx.arc(entity.data.x, entity.data.y, entity.data.radius, 0, Math.PI * 2);
  ctx.strokeStyle = entity.data.stroke;
  ctx.lineWidth = entity.data.strokeWidth;
  ctx.stroke();

  //## Use this to easily variate between different powerups
  ctx.beginPath();
  ctx.arc(entity.data.x, entity.data.y, entity.data.radius + entity.data.strokeWidth*2, 0, Math.PI * 2);
  ctx.strokeStyle = '#990';
  ctx.stroke();
};
