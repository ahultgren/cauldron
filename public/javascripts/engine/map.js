'use strict';

/*jshint -W079 */

var Map = module.exports = function (segments) {
  this._type = 'alwaysVisible';
  this.segments = segments;
};

Map.prototype.draw = function (ctx) {
  ctx.strokeStyle = '#c33';
  ctx.lineWidth = 2;
  ctx.beginPath();

  this.segments.forEach(function (segment) {
    ctx.moveTo(segment.a.x, segment.a.y);
    ctx.lineTo(segment.b.x, segment.b.y);
  });

  ctx.stroke();
};
