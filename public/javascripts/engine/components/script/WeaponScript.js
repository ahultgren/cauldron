'use strict';

var util = require('util');
var utils = require('../../utils');
var Component = require('../Component');


var Script = module.exports = function WeaponScript (settings) {
  this.constructor.super_.call(this, {
    shooting: false
  }, settings);
};

util.inherits(Script, Component);

Script.create = function () {
  return new Script();
};

Script.prototype.init = function(entity) {
  entity.mediator.on('shoot', shoot);
  entity.mediator.on('triggerStart', this.triggerStart.bind(this));
  entity.mediator.on('triggerEnd', this.triggerEnd.bind(this));
};

Script.prototype.triggerStart = function (from, toward, spread) {
  this.shooting = true;
  this.from = from;
  this.toward = toward;
  this.spread = spread;
};

Script.prototype.triggerEnd = function() {
  this.shooting = false;
};

Script.prototype.update = function(entity) {
  // Whether to shoot or not
  if(this.shooting && entity.data.lastShot <= 0) {
    entity.data.lastShot = entity.data.shotInterval;
    shoot(entity, this.from, this.toward, entity.data.spread);

    if(entity.data.singleAction) {
      this.shooting = false;
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

/* Helpers
============================================================================= */

function shoot (entity, from, toward, spread) {
  entity.game.factories.ammunition(entity.data.ammunition, {
    from: from,
    toward: toward,
    weapon: entity
  },
  utils.extend(
    {
      spread: spread,
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
