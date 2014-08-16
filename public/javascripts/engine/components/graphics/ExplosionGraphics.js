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


Graphics.prototype.type_ = 'masked';

Graphics.prototype.draw = function(entity, ctx) {
  if(this.currentStep > this.duration) {
    return entity.remove();
  }

  entity.data.radius += this.inflationSpeed;
  entity.data.fill = this.gradient[this.currentStep++] || this.gradient[this.gradient.length - 1];

  this.drawBall(entity, ctx);
};

Graphics.prototype.drawBall = function(entity, ctx) {
  ctx.beginPath();
  ctx.fillStyle = entity.data.fill;
  ctx.arc(0, 0, entity.data.radius, 0, Math.PI * 2);
  ctx.fill();
};
