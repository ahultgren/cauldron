'use strict';

var utils = require('../../utils');
var defaults = {};


var Graphics = module.exports = exports = function Graphics (settings) {
  utils.extend(this, defaults, settings);
};


Graphics.prototype.draw = function(entity, ctx) {
  ctx.beginPath();
  ctx.arc(entity.x, entity.y, entity.radius, entity.a + 0.5, entity.a + Math.PI + 0.5, false);
  ctx.fillStyle = entity.fill;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(entity.x, entity.y, entity.radius, entity.a + 0.75 * Math.PI, entity.a + 1.75 * Math.PI, false);
  ctx.fill();
};
