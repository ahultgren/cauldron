'use strict';

var START = Math.PI * 0.25;
var END = 1.75 * Math.PI;

var Graphics = module.exports = exports;

Graphics.type_ = 'masked';

Graphics.create = function () {
  return Graphics;
};

Graphics.init = function (entity) {
  entity.data.gco_ = Graphics.type_;
};

Graphics.draw = function(entity, ctx) {
  ctx.beginPath();
  ctx.fillStyle = entity.data.fill;
  ctx.arc(0, 0, entity.data.radius, START, END, false);
  ctx.lineTo(0, 0);
  ctx.fill();
};

Graphics.remove = function() {};
