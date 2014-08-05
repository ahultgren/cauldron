'use strict';

var util = require('util');
var Component = require('../Component');


var Collision = module.exports = function BallCollision (settings) {
  this.constructor.super_.call(this, {
    powerups: []
  }, settings);
};

util.inherits(Collision, Component);


Collision.prototype.type_ = 'collidable';
Collision.prototype.response_ = 'obstaclePhobic';
Collision.prototype.onCollision = function() {};

Collision.prototype.update = function(entity) {
  var self = this;

  self.powerups.forEach(function (powerup) {
    if(powerup.type === 'weapon') {
      entity.replace('weapon', self.game.factories.weapon(powerup.data));
    }
  });

  self.powerups = [];
};

//## This shouldn't really be done in this component, right?
Collision.prototype.powerup = function(type, data) {
  this.powerups.push({
    type: type,
    data: data
  });
};
