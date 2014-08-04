'use strict';

var util = require('util');
var Component = require('../Component');


var Graphics = module.exports = function MapGraphics (settings) {
  this.constructor.super_.call(this, {}, settings);
};

util.inherits(Graphics, Component);


Graphics.prototype.type_ = 'masked';

Graphics.prototype.draw = function(entity, ctx) {
  ctx.strokeStyle = '#c33';
  ctx.lineWidth = 2;
  ctx.beginPath();

  entity.segments.forEach(function (segment) {
    ctx.moveTo(segment.a.x, segment.a.y);
    ctx.lineTo(segment.b.x, segment.b.y);
  });

  ctx.stroke();
};
