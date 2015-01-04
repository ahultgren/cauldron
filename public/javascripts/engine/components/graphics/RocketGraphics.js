'use strict';

var utils = require('../../utils');
var Graphics = module.exports = exports;

Graphics.type_ = 'masked';

Graphics.create = function () {
  return Graphics;
};

Graphics.init = function(entity) {
  entity.data.flareRadius = entity.data.flareRadius || 3;
  entity.data.minFlareRadius = entity.data.minFlareRadius || 3;
  entity.data.maxFlareRadius = entity.data.maxFlareRadius || 10;

  entity.data.gco_ = Graphics.type_;
};

Graphics.update = function(entity, ctx) {
  //## entity.shape or maybe entity.spatial should be a good place to store geometrical data for all entities? Even collision-testing should be able to use it
  utils.drawPolygon(entity.data.path, ctx, entity.data.fill);

  // Draw flare
  ctx.beginPath();
  ctx.fillStyle = '#fe6';
  entity.data.flareRadius += Math.round(Math.random()*4) - 2;

  if(entity.data.flareRadius < entity.data.minFlareRadius) {
    entity.data.flareRadius = entity.data.minFlareRadius;
  }
  else if(entity.data.flareRadius > entity.data.maxFlareRadius) {
    entity.data.flareRadius = entity.data.maxFlareRadius;
  }

  ctx.arc(-6, 0, entity.data.flareRadius, 0, Math.PI*2);
  ctx.fill();
};

Graphics.remove = function(){};
