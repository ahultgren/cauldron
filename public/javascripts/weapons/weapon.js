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

  utils.extend(this, settings);

  //## Shouldn't really be done here. Some kind of game auto-adding would be nice
  this.game.add('moving', this);
};


Weapon.prototype.triggerStart = function (from, toward) {
  this.shooting = true;
  this.from = from;
  this.toward = toward;
};


Weapon.prototype.triggerEnd = function() {
  this.shooting = false;
};


Weapon.prototype.move = function() {
  if(this.shooting && this.lastShot <= 0) {
    this.lastShot = this.shotInterval;
    this.shoot(this.from, this.toward);

    if(this.singleAction) {
      this.shooting = false;
    }
  }
  else {
    this.lastShot--;
  }
};

Weapon.prototype.shoot = function(from, toward) {
  var bullet = new this.ammunition({
    from: from,
    toward: toward,
    segments: this.map.segments
  });

  this.game
    .add('masked', bullet)
    .add('moving', bullet);
};
