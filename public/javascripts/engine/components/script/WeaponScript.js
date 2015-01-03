'use strict';

var utils = require('../../utils');
var weaponFactory = require('../../factories/weaponFactory');
var defaults = {
  lastShot: 0,
  shotInterval: 6,
  minAccuracy: 1,
  maxAccuracy: 0.1,
  spreadRange: 0.1,
  spread: 0.1
};

var Script = module.exports;

Script.create = function () {
  return Script;
};

Script.init = function(entity) {
  var weaponData = weaponFactory(entity.data.weaponName);

  entity.mediator.on('shoot', shoot);
  entity.mediator.on('triggerStart', triggerStart.bind(null, entity));
  entity.mediator.on('triggerEnd', triggerEnd.bind(null, entity));
  entity.mediator.on('newWeapon', newWeapon.bind(null, entity));

  antiExtend(entity.data, defaults);
  antiExtend(entity.data, weaponData);
};

Script.update = function(entity) {
  // Whether to shoot or not
  if(entity.data.shooting && entity.data.lastShot <= 0) {
    entity.data.lastShot = entity.data.shotInterval;
    shoot(entity, entity.data.from, entity.data.toward, entity.data.spread);

    if(entity.data.singleAction) {
      entity.data.shooting = false;
    }

    // Increase spreadRange based on accuracy
    entity.data.spreadRange = entity.data.minAccuracy;
  }
  else {
    entity.data.lastShot--;
  }

  // Reduce spreadRange
  //## different reduction based on weight or something?
  entity.data.spreadRange -= (entity.data.spreadRange - entity.data.maxAccuracy) * 0.05;

  entity.data.spread = (Math.random() * entity.data.spreadRange - entity.data.spreadRange/2) * (Math.random() * entity.data.spreadRange - entity.data.spreadRange/2);
};

Script.remove = function(){};

/* Helpers
============================================================================= */

function triggerStart (entity, from, toward, spread) {
  entity.data.shooting = true;
  entity.data.from = from;
  entity.data.toward = toward;
  entity.data.spread = spread;
}

function triggerEnd (entity) {
  entity.data.shooting = false;
}

function shoot (entity, from, toward, spread) {
  entity.game.factories.ammunition(entity.data.ammunition, {
    from: from,
    toward: toward
  },
  utils.extend(
    {
      spread: spread,
      player: entity,
      playerId: entity.data.playerId
    },
    entity.data.ammunitionData
  ));

  entity.mediator.emit('action', 'shoot', {
    from: {
      x: from.data.x,
      y: from.data.y
    },
    toward: {
      x: toward.x,
      y: toward.y
    },
    spread: spread
  });
}

function newWeapon (entity, weaponName) {
  var weaponData = weaponFactory(weaponName);

  entity.data.weaponName = weaponName;
  utils.extend(entity.data, weaponData);
}

/**
 * Temporary helper for extending only if property is not set
 */
function antiExtend (target, data) {
  Object.keys(data).forEach(function (key) {
    if(!target[key]) {
      target[key] = data[key];
    }
  });
}
