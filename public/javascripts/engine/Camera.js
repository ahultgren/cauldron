'use strict';

var utils = require('./utils');

var Camera = module.exports = function Camera (settings) {
  var self = this;

  this.x = 0;
  this.y = 0;

  utils.extend(this, settings);
  // player, canvas

  // A bit hacky solution for calculating coordinates that are not relative to
  // the map.
  settings.corrected.forEach(function (object) {
    object.correct(self);
  });
};


Camera.prototype.update = function() {
  this.x = this.canvas.width/2 - this.player.data.x;
  this.y = this.canvas.height/2 - this.player.data.y;

  //## clamp when close to border
};
