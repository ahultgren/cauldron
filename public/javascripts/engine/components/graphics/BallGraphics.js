'use strict';

var Graphics = module.exports = exports;

Graphics.create = function () {
  return Graphics;
};

Graphics.init = function(entity) {
  entity.data.flashed = entity.data.flashed || false;
  entity.data.flashColor = entity.data.flashColor || '#fd0';
};

Graphics.update = function(entity, ctx) {
  var radius = entity.data.radius;
  var fill = entity.data.fill;

  // Muzzle flash
  if(!entity.data.flashed) {
    radius *= 2;
    fill = entity.data.flashColor;
    entity.data.flashed = true;
  }

  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
};
