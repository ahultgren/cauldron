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
  var path = entity.data.path;

  if((entity.data.aliveFor++) >= entity.data.aliveUntil) {
    entity.remove();
    return;
  }

  // Muzzle flash
  if(!this.flashed) {
    flashX = path[0].x + Math.cos(entity.data.angle)*5;
    flashY = path[0].y + Math.sin(entity.data.angle)*5;

    ctx.beginPath();
    ctx.arc(flashX, flashY, 10, 0, Math.PI * 2);
    ctx.fillStyle = this.flashColor;
    ctx.fill();

    this.flashed = true;
  }

  ctx.strokeStyle = '#c63';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(path[0].x, path[0].y);
  ctx.lineTo(path[1].x, path[1].y);
  ctx.stroke();
};
