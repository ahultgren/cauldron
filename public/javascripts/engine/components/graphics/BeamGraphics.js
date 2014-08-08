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

  if((entity.data.aliveFor++) >= entity.data.aliveUntil) {
    entity.remove();
    return;
  }

  // Muzzle flash
  if(!this.flashed) {
    flashX = entity.from.data.x + Math.cos(entity.data.angle)*5;
    flashY = entity.from.data.y + Math.sin(entity.data.angle)*5;

    ctx.beginPath();
    ctx.arc(flashX, flashY, 10, 0, Math.PI * 2);
    ctx.fillStyle = this.flashColor;
    ctx.fill();

    this.flashed = true;
  }

  //## Use entity.data.path instead of .from and .b
  ctx.strokeStyle = '#c63';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(entity.from.data.x, entity.from.data.y);
  ctx.lineTo(entity.data.b.x, entity.data.b.y);
  ctx.stroke();
};
