'use strict';

var START = Math.PI * 0.25;
var END = 1.75 * Math.PI;

var Graphics = module.exports = exports;

Graphics.create = function () {
  return Graphics;
};

// [TODO] Cleanup when player is done converting
Graphics.update = Graphics.draw = function(entity, ctx) {
  ctx.beginPath();
  ctx.fillStyle = entity.data.fill;
  ctx.arc(0, 0, entity.data.radius, START, END, false);
  ctx.lineTo(0, 0);
  ctx.fill();
};
