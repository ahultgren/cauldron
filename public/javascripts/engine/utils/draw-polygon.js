'use strict';

module.exports = function drawPolygon (polygon, ctx, fillStyle) {
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.moveTo(polygon[0].x, polygon[0].y);

  for(var i = 1; i < polygon.length; i++) {
    var intersect = polygon[i];
    ctx.lineTo(intersect.x,intersect.y);
  }

  ctx.fill();
};
