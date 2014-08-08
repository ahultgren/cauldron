'use strict';

var util = require('util');
var Component = require('../Component');
var LocalPlayerPowerups = require('./LocalPlayerPowerups');


var Powerups = module.exports = function PeerPlayerPowerups (settings) {
  this.constructor.super_.call(this, {
    newPowerups: []
  }, settings);
};

util.inherits(Powerups, Component);


Powerups.prototype.update = LocalPlayerPowerups.prototype.update;

Powerups.prototype.add = function() {
  // Peers react to no shit; they take orders from input only
};
