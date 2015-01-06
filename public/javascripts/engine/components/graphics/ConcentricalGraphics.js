'use strict';

var Graphics = module.exports = exports;

Graphics.type_ = 'masked';

Graphics.create = function () {
  return Graphics;
};

Graphics.init = function (entity) {
  // [TODO] Use a gco-component for this instead?
  entity.data.gco_ = Graphics.type_;
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

Graphics.remove = function() {};
