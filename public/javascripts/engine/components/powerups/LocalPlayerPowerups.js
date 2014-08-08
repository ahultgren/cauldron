'use strict';

var util = require('util');
var Component = require('../Component');


var Powerups = module.exports = function LocalPlayerPowerups (settings) {
  this.constructor.super_.call(this, {
    newPowerups: []
  }, settings);
};

util.inherits(Powerups, Component);


Powerups.prototype.update = function(entity) {
  var self = this;

  self.newPowerups.forEach(function (powerup) {
    switch (powerup.type) {
      case 'weapon':
        entity.replace('weapon', self.game.factories.weapon(powerup.data));
        break;
    }
  });

  self.newPowerups = [];
};

Powerups.prototype.add = function(powerup) {
  this.newPowerups.push(powerup);
  this.emit('newPowerup', powerup);
};
