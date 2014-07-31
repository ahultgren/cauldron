'use strict';

var util = require('util');
var Component = require('../Component');
var gradient = [
  '#f60',
  '#f84',
  '#f97',
  '#fba',
  '#fdb',
  '#ffc',
  '#fff'
];
var defaults = {
  currentStep: 0,
  gradient: gradient,
  inflationSpeed: 5,
  duration: 5
};


var Graphics = module.exports = function ExplosionGraphics (settings) {
  this.constructor.super_.call(this, defaults, settings);
};

util.inherits(Graphics, Component);


Graphics.prototype.draw = function(entity, ctx) {
  if(this.currentStep > this.duration) {
    return entity.remove();
  }

  entity.radius += this.inflationSpeed;
  entity.fill = this.gradient[this.currentStep++] || this.gradient[this.gradient.last];

  this.drawBall(entity, ctx);
};

Graphics.prototype.drawBall = function(entity, ctx) {
  ctx.beginPath();
  ctx.arc(entity.x, entity.y, entity.radius, 0, Math.PI * 2);
  ctx.fillStyle = entity.fill;
  ctx.fill();
};
