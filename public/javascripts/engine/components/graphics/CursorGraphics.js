'use strict';

var Graphics = module.exports = exports;

Graphics.type_ = 'alwaysVisible';

Graphics.create = function () {
  return Graphics;
};

Graphics.init = function(entity) {
  entity.data.gco_ = Graphics.type_;
};

Graphics.update = function(entity, ctx) {
  var angle, dx, dy;
  var fuzzyRadius = 10;

  ctx.beginPath();
  ctx.fillStyle = entity.data.fill;
  ctx.arc(entity.data.mouse.x, entity.data.mouse.y, 2, 0, 2*Math.PI, false);
  ctx.fill();

  for(angle = 0; angle < Math.PI*2; angle += Math.PI*2/10) {
    dx = Math.cos(angle)*fuzzyRadius;
    dy = Math.sin(angle)*fuzzyRadius;

    ctx.beginPath();
    ctx.arc(entity.data.mouse.x+dx, entity.data.mouse.y+dy, 2, 0, 2*Math.PI, false);
    ctx.fill();
  }
};
