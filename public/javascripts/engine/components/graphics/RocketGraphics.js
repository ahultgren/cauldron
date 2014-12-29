'use strict';

var util = require('util');
var utils = require('../../utils');
var Component = require('../Component');


var Graphics = module.exports = function RocketGraphics (settings) {
  this.constructor.super_.call(this, {
    flareRadius: 3,
    minFlareRadius: 3,
    maxFlareRadius: 10
  }, settings);
};

util.inherits(Graphics, Component);

Graphics.create = function (settings) {
  return new Graphics(settings);
};


Graphics.prototype.type_ = 'masked';

Graphics.prototype.draw = function(entity, ctx) {
  //## entity.shape or maybe entity.spatial should be a good place to store geometrical data for all entities? Even collision-testing should be able to use it
  utils.drawPolygon(entity.data.path, ctx, entity.data.fill);

  // Draw flare
  ctx.beginPath();
  ctx.fillStyle = '#fe6';
  this.flareRadius += Math.round(Math.random()*4) - 2;

  if(this.flareRadius < this.minFlareRadius) {
    this.flareRadius = this.minFlareRadius;
  }
  else if(this.flareRadius > this.maxFlareRadius) {
    this.flareRadius = this.maxFlareRadius;
  }

  ctx.arc(-6, 0, this.flareRadius, 0, Math.PI*2);
  ctx.fill();
};
