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

  this.draw();
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
  var i, l, ii, ll;
  var obstacles = this.obstacle;
  var collidable = this.collidable;

  // Check if a collidable collides with the map
  for(i = 0, l = collidable.length; i < l; i++) {
    if(collidable[i].remove_ || collidable[i].stopCollisionTests_) {
      collidable.splice(i--, 1);
      l--;
      continue;
    }

    if(this.game.collisionManager.testMap(collidable[i])) {
      collidable[i].onCollision('map');
    }
  }

  // Check if a collidable collides with an obstacle
  for(i = 0, l = collidable.length; i < l; i++) {
    for(ii = 0, ll = obstacles.length; ii < ll; ii++) {
      if(obstacles[ii].remove_) {
        obstacles.splice(ii--, 1);
        ll--;
        continue;
      }

      if(this.game.collisionManager.test(collidable[i], obstacles[ii])) {
        collidable[i].onCollision('obstacle', obstacles[ii]);
        obstacles[ii].onCollision('collidable', collidable[i]);
      }
    }
  }

  // Check if a collidable collides with another collidable
  for(i = 0, l = collidable.length; i < l; i++) {
    for(ii = i + 1; ii < l; ii++) {
      if(this.game.collisionManager.test(collidable[i], collidable[ii])) {
        collidable[i].onCollision('collidable', collidable[ii]);
        collidable[ii].onCollision('collidable', collidable[i]);
      }
    }
  }
};

Loop.prototype.updateEvent = function() {
  var i, l;

  for(i = 0, l = this.eventUpdating.length; i < l; i++) {
    this.eventUpdating[i].updateEvent();
  }
};

Loop.prototype.draw = function () {
  var ctx = this.canvas.ctx;

  // Clear canvas
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  ctx.save();

  // Draw each registered layer in turn and in place
  this.drawEach('destination-over', this.visibilityPolygons);
  this.drawEach('destination-over', this.antiMasked);
  this.drawEach('source-atop', this.masked);
  this.drawEach('source-over', this.alwaysVisible);

  ctx.restore();
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

      if(data.isPlayer_) {
        ctx.save();
        ctx.translate(data.x || 0, data.y || 0);
        ctx.rotate(data.a || 0);
      }

      objects[i].draw(ctx);

      if(data.isPlayer_) {
        ctx.restore();
      }
    }
  }
};
