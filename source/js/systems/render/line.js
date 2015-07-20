'use strict';

module.exports = (ctx, {fill}) => {
  ctx.strokeStyle = fill;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(100, 100);
  ctx.stroke();
};
