'use strict';

var MS_PER_UPDATE = 1000/60;
var MAX_FRAMES_SKIP = 10;

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;


var Loop = module.exports = function (canvas) {
  this.canvas = canvas;
  this.paused = true;
  this.previousTime = 0;

  this.static = [];             // Objects not moving but collidable
  this.moving = [];             // Objects moving
  this.visibilityPolygons = []; // Polygons masking the seen area
  this.antiMasked = [];         // Objects only visible when not looked at
  this.masked = [];             // Objects only seen when looked at
  this.alwaysVisible = [];      // Objects always seen
};


Loop.prototype.start = function() {
  this.paused = false;
  this.previousTime = window.performance.now();
  this.loop();
};

Loop.prototype.pause = function() {
  this.paused = true;
};

Loop.prototype.loop = function () {
  var currentTime, elapsed;
  var skipped = 0;

  if(this.paused) {
    return;
  }

  currentTime = window.performance.now();
  elapsed = currentTime - this.previousTime;
  this.previousTime = currentTime;

  this.update();

  // Some extra milliseconds are subtracted because the browser doesn't seem to
  // invoke frames with a consistent interval (or something?)
  while((elapsed -= MS_PER_UPDATE) - MS_PER_UPDATE * 0.5 >= 0 && skipped++ < MAX_FRAMES_SKIP) {
    this.update();
  }

  window.requestAnimationFrame(this.loop.bind(this));

  this.draw();
};

Loop.prototype.update = function () {
  var i, l,
      ctx = this.canvas.ctx;

  // Move the registered objects
  for(i = 0, l = this.moving.length; i < l; i++) {
    if(this.moving[i]._remove) {
      this.moving.splice(i--, 1);
      l--;
    }
    else {
      this.moving[i].update(ctx);
    }
  }
};

Loop.prototype.draw = function () {
  var ctx = this.canvas.ctx;

  // Clear canvas
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  // Draw each registered layer in turn and in place
  this.drawEach('destination-over', this.visibilityPolygons);
  this.drawEach('destination-over', this.antiMasked);
  this.drawEach('source-atop', this.masked);
  this.drawEach('source-over', this.alwaysVisible);
};


Loop.prototype.drawEach = function(gco, objects) {
  var i, l;

  this.canvas.ctx.globalCompositeOperation = gco;

  for(i = 0, l = objects.length; i < l; i++) {
    if(objects[i]._remove) {
      objects.splice(i--, 1);
      l--;
    }
    else {
      objects[i].draw(this.canvas.ctx);
    }
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
