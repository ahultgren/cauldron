'use strict';

module.exports = (ctx, {fill, stroke, paths}) => {
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;

  paths.forEach(([[startX, startY], ...path]) => {
    ctx.moveTo(startX, startY);

    path.forEach(([x, y]) => {
      ctx.lineTo(x, y);
    });
  });

  ctx.stroke();
  ctx.fill();
};
