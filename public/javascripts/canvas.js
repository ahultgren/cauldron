'use strict';

var canvas = module.exports = document.getElementById('canvas');

// Set height to css height
canvas.width = require('jquery')(canvas).width();
canvas.height = require('jquery')(canvas).height();
