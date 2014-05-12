'use strict';

var canvas = module.exports = document.querySelector('#canvas');

// Set dimensions to css dimensions
canvas.width = require('jquery')(canvas).width();
canvas.height = require('jquery')(canvas).height();

canvas.ctx = canvas.getContext('2d');


//## Dunny why the fuck this doesnt work...
/*module.exports = function (selector) {
  var canvas = document.querySelector(selector);

  // Set dimensions to css dimensions
  canvas.width = require('jquery')(canvas).width();
  canvas.height = require('jquery')(canvas).height();

  return canvas;
};
*/
