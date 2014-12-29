'use strict';

var util = require('util');
var Component = require('../Component');


var Graphics = module.exports = function CursorGraphics (settings) {
  this.constructor.super_.call(this, {}, settings);
  // mouse
};

util.inherits(Graphics, Component);

Graphics.create = function (settings) {
  return new Graphics(settings);
};


Graphics.prototype.type_ = 'alwaysVisible';

Graphics.prototype.draw = function(entity, ctx) {
  var angle, dx, dy;
  var fuzzyRadius = 10;

  ctx.beginPath();
  ctx.fillStyle = entity.data.fill;
  ctx.arc(this.mouse.x, this.mouse.y, 2, 0, 2*Math.PI, false);
  ctx.fill();

  for(angle = 0; angle < Math.PI*2; angle += Math.PI*2/10) {
    dx = Math.cos(angle)*fuzzyRadius;
    dy = Math.sin(angle)*fuzzyRadius;

    ctx.beginPath();
    ctx.arc(this.mouse.x+dx, this.mouse.y+dy, 2, 0, 2*Math.PI, false);
    ctx.fill();
  }
};
