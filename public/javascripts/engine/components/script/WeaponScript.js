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
    this.shoot(entity, this.from, this.toward, entity.data.spread);

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

Script.prototype.shoot = function(entity, from, toward, spread) {
  this.game.factories.ammunition(entity.data.ammunition, {
    from: from,
    toward: toward,
    weapon: entity
  },
  utils.extend(
    {
      spread: spread,
    },
    entity.data.ammunitionData
  ));

  entity.emit('action', 'shoot', {
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
};
