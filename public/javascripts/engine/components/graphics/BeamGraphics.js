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
  var flashX, flashY;
  var path = entity.data.path;

  // Muzzle flash
  if(!entity.data.flashed) {
    flashX = path[0].x;
    flashY = path[0].y;

    ctx.beginPath();
    ctx.arc(flashX, flashY, 15, 0, Math.PI * 2);
    ctx.fillStyle = entity.data.flashColor;
    ctx.fill();

    entity.data.flashed = true;
  }

  ctx.strokeStyle = entity.data.color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(path[0].x, path[0].y);
  ctx.lineTo(path[1].x, path[1].y);
  ctx.stroke();
};
