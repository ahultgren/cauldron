'use strict';

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


var Graphics = module.exports = exports;

Graphics.create = function () {
  return Graphics;
};


Graphics.type_ = 'masked';

Graphics.init = function(entity) {
  entity.data.currentStep = entity.data.currentStep || defaults.currentStep;
  entity.data.gradient = entity.data.gradient || defaults.gradient;
  entity.data.inflationSpeed = entity.data.inflationSpeed || defaults.inflationSpeed;
  entity.data.duration = entity.data.duration || defaults.duration;

  entity.data.gco_ = Graphics.type_;
};

Graphics.update = function(entity, ctx) {
  if(entity.data.currentStep > entity.data.duration) {
    return entity.remove();
  }

  entity.data.radius += entity.data.inflationSpeed;
  entity.data.fill = entity.data.gradient[entity.data.currentStep++] || entity.data.gradient[entity.data.gradient.length - 1];

  Graphics.drawBall(entity, ctx);
};

Graphics.drawBall = function(entity, ctx) {
  ctx.beginPath();
  ctx.fillStyle = entity.data.fill;
  ctx.arc(0, 0, entity.data.radius, 0, Math.PI * 2);
  ctx.fill();
};
