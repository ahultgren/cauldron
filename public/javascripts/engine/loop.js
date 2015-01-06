'use strict';

var MS_PER_UPDATE = 1000/60;
var MAX_FRAMES_SKIP = 10;

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;


var Loop = module.exports = function (game) {
  this.game = game;
  this.canvas = game.canvas;
  this.paused = true;
  this.previousTime = 0;

  this.updating = [];           // Objects updating each tick
  this.eventUpdating = [];      // Objects updating each step but not each tick

  this.obstacle = [];           // Objects not moving but collidable
  this.collidable = [];         // Objects moving and collidable

  this.visibilityPolygons = []; // Objects masking the seen area
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
  this.collide();

  // Some extra milliseconds are subtracted because the browser doesn't seem to
  // invoke frames with a consistent interval (or something?)
  while((elapsed -= MS_PER_UPDATE) - MS_PER_UPDATE * 0.5 >= 0 && skipped++ < MAX_FRAMES_SKIP) {
    this.update();
    this.collide();
  }

  this.updateEvent();

  window.requestAnimationFrame(this.loop.bind(this));

  this.updateStage2();
};

Loop.prototype.update = function () {
  var i, l,
      ctx = this.canvas.ctx;

  // Move the registered objects
  for(i = 0, l = this.updating.length; i < l; i++) {
    if(this.updating[i].remove_) {
      this.updating.splice(i--, 1);
      l--;
    }
    else {
      this.updating[i].update(ctx);
    }
  }
};

Loop.prototype.collide = function() {
  var i, l;
  var obstacles = this.obstacle;
  var collidable = this.collidable;

  // Remove collidable if removed
  for(i = 0, l = collidable.length; i < l; i++) {
    if(collidable[i].remove_ || collidable[i].stopCollisionTests_) {
      collidable.splice(i--, 1);
      l--;
      continue;
    }
  }

  // Remove obstacle if removed
  for(i = 0, l = obstacles.length; i < l; i++) {
    if(obstacles[i].remove_) {
      obstacles.splice(i--, 1);
      l--;
      continue;
    }
  }

  this.game.collisionManager.mapTests(collidable);
  this.game.collisionManager.obstacleTests(collidable, obstacles);
  this.game.collisionManager.collidableTests(collidable);
};

Loop.prototype.updateEvent = function() {
  var i, l;

  for(i = 0, l = this.eventUpdating.length; i < l; i++) {
    this.eventUpdating[i].updateEvent();
  }
};

Loop.prototype.updateStage2 = function () {
  var ctx = this.canvas.ctx;

  // Clear canvas
  this.cameraTransform(0, 0);
  this.transform(ctx);
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.cameraTransform(this.game.camera.x, this.game.camera.y);

  // Draw each registered layer in turn and in place
  this.drawEach('destination-over', this.visibilityPolygons);
  this.drawEach('destination-over', this.antiMasked);
  this.drawEach('source-atop', this.masked);
  this.drawEach('source-over', this.alwaysVisible);
};


Loop.prototype.drawEach = function(gco, objects) {
  var i, l, data;
  var ctx = this.canvas.ctx;

  ctx.globalCompositeOperation = gco;

  for(i = 0, l = objects.length; i < l; i++) {
    if(objects[i].remove_) {
      objects.splice(i--, 1);
      l--;
    }
    else {
      data = objects[i].data;

      this.transform(ctx, data.x, data.y, data.a);
      objects[i].updateStage2(ctx);
    }
  }
};

Loop.prototype.transform = function(ctx, x, y, a) {
  var offsetX = this.cameraX + (x || 0);
  var offsetY = this.cameraY + (y || 0);
  var offsetA = a || 0;
  var angleSine = 0;
  var angleCosine = 1;

  if(offsetA) {
    angleSine = Math.sin(offsetA);
    angleCosine = Math.cos(offsetA);
  }

  ctx.setTransform(
    angleCosine, angleSine,
    -angleSine, angleCosine,
    offsetX, offsetY
  );
};

Loop.prototype.cameraTransform = function(x, y) {
  this.cameraX = x;
  this.cameraY = y;
};
