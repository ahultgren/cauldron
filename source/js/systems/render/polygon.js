'use strict';

module.exports = (ctx, {fill, stroke, path: [[startX, startY], ...path]}) => {
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;

  ctx.moveTo(startX, startY);

  path.forEach(([x, y]) => {
    ctx.lineTo(x, y);
  });

  ctx.stroke();
  ctx.fill();
};
