'use strict';

var util = require('util');
var Component = require('../Component');


var Graphics = module.exports = function BallGraphics (settings) {
  this.constructor.super_.call(this, {
    flashed: false,
    flashColor: '#fd0'
  }, settings);
};

util.inherits(Graphics, Component);


Graphics.prototype.type_ = 'masked';

Graphics.prototype.draw = function(entity, ctx) {
  var radius = entity.data.radius;
  var fill = entity.data.fill;

  // Muzzle flash
  if(!this.flashed) {
    radius *= 2;
    fill = this.flashColor;
    this.flashed = true;
  }

  ctx.beginPath();
  ctx.arc(entity.data.x, entity.data.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
};
