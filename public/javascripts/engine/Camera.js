'use strict';

var utils = require('./utils');
var MAP_OVERFLOW = 20;

var Camera = module.exports = function Camera (settings) {
  var self = this;

  this.x = 0;
  this.y = 0;

  utils.extend(this, settings);
  // player, canvas, map

  // A bit hacky solution for calculating coordinates that are not relative to
  // the map.
  settings.corrected.forEach(function (object) {
    object.correct(self);
  });
};


Camera.prototype.update = function() {
  this.x = this.canvas.width/2 - this.player.data.x;
  this.y = this.canvas.height/2 - this.player.data.y;
  this.clamp_();
};


/* Private
============================================================================= */

Camera.prototype.clamp_ = function() {
  var maxX = this.canvas.width - this.map.data.width - MAP_OVERFLOW;
  var maxY = this.canvas.height - this.map.data.height - MAP_OVERFLOW;

  if(this.x > MAP_OVERFLOW) {
    this.x = MAP_OVERFLOW;
  }
  else if(this.x < maxX) {
    this.x = maxX;
  }

  if(this.y > MAP_OVERFLOW) {
    this.y = MAP_OVERFLOW;
  }
  else if(this.y < maxY) {
    this.y = maxY;
  }
};
