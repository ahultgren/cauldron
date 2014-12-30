'use strict';

var DEFAULT_CIRCLES = [
  {
    stroke: '#2d0',
    radius: 10,
    strokeWidth: 2
  },
  {
    stroke: '#af0',
    radius: 14,
    strokeWidth: 2
  }
];

var Graphics = module.exports = exports;

Graphics.type_ = 'masked';

Graphics.create = function () {
  return Graphics;
};

Graphics.init = function (entity) {
  entity.data.puCircles = entity.data.puCircles || DEFAULT_CIRCLES;
};

Graphics.draw = function(entity, ctx) {
  entity.data.puCircles.forEach(function (circle) {
    ctx.beginPath();
    ctx.arc(0, 0, circle.radius, 0, Math.PI * 2);
    ctx.strokeStyle = circle.stroke;
    ctx.lineWidth = circle.strokeWidth;
    ctx.stroke();
  });
};

Graphics.remove = function() {};
