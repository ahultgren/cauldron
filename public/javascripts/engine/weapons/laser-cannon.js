'use strict';

var util = require('util');
var Weapon = require('./weapon');
var Beam = require('./ammunition/beam');


var LaserCannon = module.exports = function (settings) {
  this.shotInterval = 10;
  this.singleAction = true;
  this.ammunition = Beam;

  Weapon.call(this, settings);
};

util.inherits(LaserCannon, Weapon);