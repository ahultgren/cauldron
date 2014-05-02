'use strict';

var util = require('util');
var Weapon = require('./weapon');
var Beam = require('./ammunition/beam');


var LaserCannon = module.exports = function (settings) {
  Weapon.call(this, settings);
};

util.inherits(LaserCannon, Weapon);


LaserCannon.prototype.triggerStart = function (from, toward) {
  this.shoot(from, toward);
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
