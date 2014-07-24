'use strict';

var utils = require('../utils');


/**
 * Weapon interface.
 */

//## Extend this to automatically set behavior based on properties like
//## .ammo, .poolSize, .interval, .automatic (.recoil, .weight)
var Weapon = module.exports = function (settings) {
  this.shooting = false;
  this.lastShot = 0;
  this.shotInterval = 6;
  this.minAccuracy = 1;
  this.maxAccuracy = 0.1;
  this.spreadRange = this.maxAccuracy;
  this.spread = this.maxAccuracy;

  utils.extend(this, settings);
};


Weapon.prototype.triggerStart = function (from, toward, spread) {
  this.shooting = true;
  this.from = from;
  this.toward = toward;
  this.spread = spread;
};


Weapon.prototype.triggerEnd = function() {
  this.shooting = false;
};


Weapon.prototype.update = function() {
  // Whether to shoot or not
  if(this.shooting && this.lastShot <= 0) {
    this.lastShot = this.shotInterval;
    this.shoot(this.from, this.toward);

    if(this.singleAction) {
      this.shooting = false;
    }

    // Increase spreadRange based on accuracy
    this.spreadRange = this.minAccuracy;
  }
  else {
    this.lastShot--;
  }

  // Reduce spreadRange
  //## different reduction based on weight or something?
  this.spreadRange -= (this.spreadRange - this.maxAccuracy) * 0.05;

  this.spread = (Math.random() * this.spreadRange - this.spreadRange/2) * (Math.random() * this.spreadRange - this.spreadRange/2);
};

Weapon.prototype.shoot = function(from, toward) {
  var bullet = new this.ammunition({
    from: from,
    toward: toward,
    spread: this.spread,
    segments: this.map.segments
  });

  this.game.add(bullet);
};
