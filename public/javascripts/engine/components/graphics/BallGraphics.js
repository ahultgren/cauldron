'use strict';

var Graphics = module.exports = exports;

Graphics.type_ = 'masked';

Graphics.create = function () {
  return Graphics;
};

Graphics.init = function(entity, settings) {
  settings = settings || {};

  entity.data.flashed = settings.flashed || false;
  entity.data.flashColor = settings.flashColor || '#fd0';

  entity.data.gco_ = Graphics.type_;
};

Graphics.draw = function(entity, ctx) {
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

// [TODO] Remove when v1 entity is gone
Graphics.remove = function(){};
