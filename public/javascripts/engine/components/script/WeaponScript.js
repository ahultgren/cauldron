'use strict';

var util = require('util');
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
  if(this.shooting && entity.lastShot <= 0) {
    entity.lastShot = entity.shotInterval;
    this.shoot(entity, this.from, this.toward, entity.spread);

    if(entity.singleAction) {
      this.shooting = false;
    }

    // Increase spreadRange based on accuracy
    entity.spreadRange = entity.minAccuracy;
  }
  else {
    entity.lastShot--;
  }

  // Reduce spreadRange
  //## different reduction based on weight or something?
  entity.spreadRange -= (entity.spreadRange - entity.maxAccuracy) * 0.05;

  entity.spread = (Math.random() * entity.spreadRange - entity.spreadRange/2) * (Math.random() * entity.spreadRange - entity.spreadRange/2);
};

Script.prototype.shoot = function(entity, from, toward, spread) {
  this.game.factories.ammunition(entity.ammunition, {
    from: from,
    toward: toward,
    spread: spread
  });

  entity.emit('action', 'shoot', {
    from: {
      x: from.x,
      y: from.y
    },
    toward: {
      x: toward.x,
      y: toward.y
    },
    spread: spread
  });
};
