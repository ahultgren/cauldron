'use strict';

var canvas = module.exports = document.querySelector('#canvas');

// Set dimensions to css dimensions
canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

canvas.ctx = canvas.getContext('2d');

window.addEventListener('resize', function () {
  canvas.width = canvas.scrollWidth;
  canvas.height = canvas.scrollHeight;
}, false);
