'use strict';

module.exports = (ctx, {fill, stroke, radius, gap = 0, segment}) => {
  ctx.beginPath();
  ctx.arc(0, 0, radius, gap, Math.PI * 2 - gap, false);

  if(segment) {
    ctx.lineTo(0, 0);
  }

  ctx.fillStyle = fill;
  ctx.fill();

  if(stroke) {
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
};
