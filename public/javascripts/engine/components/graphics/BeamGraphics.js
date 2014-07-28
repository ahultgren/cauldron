'use strict';

var util = require('util');
var Component = require('../Component');


var Graphics = module.exports = function BeamGraphics (settings) {
  this.constructor.super_.call(this, {}, settings);
};

util.inherits(Graphics, Component);


Graphics.prototype.draw = function(entity, ctx) {
  if((entity.aliveFor++) >= entity.aliveUntil) {
    entity._remove = true;
    return;
  }

  ctx.strokeStyle = '#c63';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(entity.from.x, entity.from.y);
  ctx.lineTo(entity.b.x, entity.b.y);
  ctx.stroke();
};
