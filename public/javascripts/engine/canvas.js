'use strict';

var $ = require('jquery');
var canvas = module.exports = document.querySelector('#canvas');
var $canvas = $(canvas);

// Set dimensions to css dimensions
canvas.width = $canvas.width();
canvas.height = $canvas.height();

canvas.ctx = canvas.getContext('2d');

$(window).on('resize', function () {
  canvas.width = $canvas.width();
  canvas.height = $canvas.height();
});


//## Dunny why the fuck this doesnt work...
/*module.exports = function (selector) {
  var canvas = document.querySelector(selector);

  // Set dimensions to css dimensions
  canvas.width = require('jquery')(canvas).width();
  canvas.height = require('jquery')(canvas).height();

  return canvas;
};
*/
