'use strict';

var Graphics = module.exports = exports;

Graphics.create = function () {
  return Graphics;
};

Graphics.init = function(entity) {
  entity.data.flashed = entity.data.flashed || false;
  entity.data.flashColor = entity.data.flashColor || '#fd0';
  entity.data.color = entity.data.color || '#c63';
};

Graphics.update = function(entity, ctx) {
  // Muzzle flash
  if(!entity.data.flashed) {
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fillStyle = entity.data.flashColor;
    ctx.fill();

    entity.data.flashed = true;
  }

  ctx.strokeStyle = entity.data.color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(entity.data.lineEnd.x, entity.data.lineEnd.y);
  ctx.stroke();
};
