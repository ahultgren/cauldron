'use strict';

var util = require('util');
var Weapon = require('./weapon');
var Beam = require('./ammunition/beam');


var LaserCannon = module.exports = function (settings) {
  this.shooting = false;
  this.lastShot = 0;
  this.shotInterval = 6;

  Weapon.call(this, settings);

  //## Shouldn't really be done here. Some kind of game auto-adding would be nice
  this.game.add('moving', this);
};

util.inherits(LaserCannon, Weapon);


LaserCannon.prototype.triggerStart = function (from, toward) {
  this.shooting = true;
  this.from = from;
  this.toward = toward;
};


LaserCannon.prototype.triggerEnd = function () {
  this.shooting = false;
};


LaserCannon.prototype.move = function() {
  if(this.shooting && this.lastShot <= 0) {
    this.lastShot = this.shotInterval;
    this.shoot(this.from, this.toward);
  }
  else {
    this.lastShot--;
  }
};


LaserCannon.prototype.shoot = function (from, toward) {
  var beam = new Beam({
    from: from,
    toward: toward,
    segments: this.map.segments
  });

  this.game
    .add('masked', beam)
    .add('moving', beam);
};
