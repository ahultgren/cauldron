'use strict';

var util = require('util');
var Component = require('../Component');


var Powerups = module.exports = function LocalPlayerPowerups (settings) {
  this.constructor.super_.call(this, {
    newPowerups: []
  }, settings);
};

util.inherits(Powerups, Component);


Powerups.prototype.init = function(entity) {
  entity.mediator.on('addPowerup', this.add.bind(this, entity));
};

Powerups.prototype.update = function(entity) {
  var self = this;
  var i, l, powerup;

  for(i = 0, l = self.newPowerups.length; i < l; i++) {
    powerup = self.newPowerups[i];

    switch (powerup.type) {
      case 'weapon':
        entity.replace('weapon', self.game.factories.weapon(powerup.data, {
          // [TODO] Is this still needed?
          player: entity,
        }, {
          playerId: entity.data.playerId
        }));
        break;
    }
  }

  self.newPowerups = [];
};

Powerups.prototype.add = function(entity, powerup) {
  this.newPowerups.push(powerup);
  entity.mediator.emit('newPowerup', powerup);
};
