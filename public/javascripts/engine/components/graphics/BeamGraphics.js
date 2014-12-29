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
  var flashX, flashY, angle;
  var path = entity.data.path;

  if((entity.data.aliveFor++) >= entity.data.aliveUntil) {
    entity.remove();
    return;
  }

  // Muzzle flash
  if(!entity.data.flashed) {
    // [TODO] How to not be dependent on weapon here? Offset the beam when created?
    angle = entity.weapon.player.data.a;
    flashX = path[0].x + Math.cos(angle)*5;
    flashY = path[0].y + Math.sin(angle)*5;

    ctx.beginPath();
    ctx.arc(flashX, flashY, 10, 0, Math.PI * 2);
    ctx.fillStyle = entity.data.flashColor;
    ctx.fill();

    entity.data.flashed = true;
  }

  ctx.strokeStyle = '#c63';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(path[0].x, path[0].y);
  ctx.lineTo(path[1].x, path[1].y);
  ctx.stroke();
};

// [TODO] Remove when v1 entity is gone
Graphics.remove = function(){};
