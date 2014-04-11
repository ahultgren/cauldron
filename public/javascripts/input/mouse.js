'use strict';

var canvas = require('../canvas');


var mouse = module.exports = {
  x: canvas.width/2,
  y: canvas.height/2
};

canvas.onmousemove = function (e) {
  mouse.x = e.layerX;
  mouse.y = e.layerY;
};
