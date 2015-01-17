'use strict';

var START = Math.PI * 0.25;
var END   = Math.PI * 1.75;

exports.create = function () {
  return exports;
};

exports.update = function(entity, ctx) {
  ctx.beginPath();
  ctx.fillStyle = entity.data.fill;
  ctx.arc(0, 0, entity.data.radius, START, END, false);
  ctx.lineTo(0, 0);
  ctx.fill();
};
