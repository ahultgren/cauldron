'use strict';

var canvas = require('./canvas'),
    ctx = require('./ctx');


window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;


var Loop = module.exports = function () {
  this.paused = true;

  this.static = [];             // Objects not moving but collidable
  this.moving = [];             // Objects moving
  this.visibilityPolygons = []; // Polygons masking the seen area
  this.antiMasked = [];         // Objects only visible when not looked at
  this.masked = [];             // Objects only seen when looked at
  this.alwaysVisible = [];      // Objects always seen
};

Loop.prototype.start = function() {
  this.paused = false;
  this.loop();
};

Loop.prototype.pause = function() {
  this.paused = true;
};

Loop.prototype.loop = function () {
  if(!this.paused) {
    window.requestAnimationFrame(this.loop.bind(this));
    this.move();
    this.draw();
  }
};

Loop.prototype.move = function () {
  var i, l;

  // Move the registered objects
  for(i = 0, l = this.visibilityPolygons.length; i < l; i++) {
    this.moving[i].move(ctx);
  }
};

Loop.prototype.draw = function () {
  var i, l;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw each registered layer in turn and in place

  ctx.globalCompositeOperation = 'destination-over';
  for(i = 0, l = this.visibilityPolygons.length; i < l; i++) {
    this.visibilityPolygons[i].draw(ctx);
  }

  ctx.globalCompositeOperation = 'destination-over';
  for(i = 0, l = this.antiMasked.length; i < l; i++) {
    this.antiMasked[i].draw(ctx);
  }

  ctx.globalCompositeOperation = 'source-atop';
  for(i = 0, l = this.masked.length; i < l; i++) {
    this.masked[i].draw(ctx);
  }

  ctx.globalCompositeOperation = 'source-over';
  for(i = 0, l = this.alwaysVisible.length; i < l; i++) {
    this.alwaysVisible[i].draw(ctx);
  }
};


/* Stuff that's masked
============================================================================= */
/*
// Masked live graphics
ctx.beginPath();
ctx.fillStyle = '#0f0';
ctx.arc(350, 100, 5, 0, 2*Math.PI, false);
ctx.fill();
*/
