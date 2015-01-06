'use strict';

var R = require('ramda');
var LocalPlayerPowerups = require('./LocalPlayerPowerups');
var Powerups = module.exports = exports;

Powerups.create = function () {
  return Powerups;
};

Powerups.init = function(entity) {
  entity.data.newPowerups = entity.data.newPowerups || [];
  entity.mediator.on('addPowerups', R.lPartial(set, entity));
};

Powerups.update = LocalPlayerPowerups.update;

Powerups.remove = function(){};

/* Helpers
============================================================================= */

function set (entity, powerups) {
  entity.data.newPowerups = powerups;
}
