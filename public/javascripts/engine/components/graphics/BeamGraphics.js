'use strict';

var util = require('util');
var Component = require('../Component');


var Graphics = module.exports = function BeamGraphics (settings) {
  this.constructor.super_.call(this, {
    flashed: false,
    flashColor: '#fd0'
  }, settings);
};

util.inherits(Graphics, Component);

Graphics.prototype.type_ = 'masked';

Graphics.prototype.draw = function(entity, ctx) {
  var flashX, flashY;

  if((entity.aliveFor++) >= entity.aliveUntil) {
    entity.remove();
    return;
  }

  // Muzzle flash
  if(!this.flashed) {
    flashX = entity.from.x + Math.cos(entity.angle)*5;
    flashY = entity.from.y + Math.sin(entity.angle)*5;

    ctx.beginPath();
    ctx.arc(flashX, flashY, 10, 0, Math.PI * 2);
    ctx.fillStyle = this.flashColor;
    ctx.fill();

    this.flashed = true;
  }

  ctx.strokeStyle = '#c63';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(entity.from.x, entity.from.y);
  ctx.lineTo(entity.b.x, entity.b.y);
  ctx.stroke();
};
