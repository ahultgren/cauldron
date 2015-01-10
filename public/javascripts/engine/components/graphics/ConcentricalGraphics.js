'use strict';

var Graphics = module.exports = exports;

Graphics.create = function () {
  return Graphics;
};

Graphics.update = function(entity, ctx) {
  entity.data.concircles.forEach(function (circle) {
    ctx.beginPath();
    ctx.arc(0, 0, circle.radius, 0, Math.PI * 2);
    ctx.strokeStyle = circle.stroke;
    ctx.lineWidth = circle.strokeWidth;
    ctx.stroke();
  });
};
