'use strict';

var R = require('ramda');
var Powerups = module.exports = exports;

Powerups.create = function () {
  return Powerups;
};

Powerups.init = function(entity) {
  entity.data.newPowerups = entity.data.newPowerups || [];
  entity.mediator.on('addPowerup', R.lPartial(add, entity));
};

Powerups.update = function(entity) {
  var i, l, powerup;

  for(i = 0, l = entity.data.newPowerups.length; i < l; i++) {
    powerup = entity.data.newPowerups[i];

    switch (powerup.type) {
      case 'weapon':
        entity.mediator.emit('newWeapon', powerup.data);
        break;
    }
  }

  entity.data.newPowerups = [];
};

/* Helpers
============================================================================= */

function add (entity, powerup) {
  entity.data.newPowerups.push(powerup);
  entity.mediator.emit('newPowerup', powerup);
}
