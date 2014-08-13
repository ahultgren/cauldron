'use strict';

var utils = require('./utils');

var Camera = module.exports = function Camera (settings) {
  utils.extend(this, settings);
  // player, canvas
};


Camera.prototype.update = function() {
  this.x = this.canvas.width/2 - this.player.data.x;
  this.y = this.canvas.height/2 - this.player.data.y;

  //## clamp when close to border
};
