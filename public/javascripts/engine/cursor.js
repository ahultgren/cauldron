'use strict';

var mouse = require('./input/mouse');


var Cursor = module.exports = function () {
  this._type = 'alwaysVisible';
  this.color = '#ccc';
};

Cursor.prototype.draw = function (ctx) {
  var angle, dx, dy,
      fuzzyRadius = 10;

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 2, 0, 2*Math.PI, false);
  ctx.fill();

  for(angle = 0; angle < Math.PI*2; angle += Math.PI*2/10) {
    dx = Math.cos(angle)*fuzzyRadius;
    dy = Math.sin(angle)*fuzzyRadius;

    ctx.beginPath();
    ctx.arc(mouse.x+dx, mouse.y+dy, 2, 0, 2*Math.PI, false);
    ctx.fill();
  }
};
