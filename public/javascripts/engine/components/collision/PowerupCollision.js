'use strict';

var util = require('util');
var Component = require('../Component');


var Collision = module.exports = function PowerupCollision (settings) {
  this.constructor.super_.call(this, {}, settings);
};

util.inherits(Collision, Component);


Collision.prototype.type_ = 'obstacle';
Collision.prototype.response_ = 'zone';

Collision.prototype.update = function() {};
Collision.prototype.onCollision = function(entity, type, target) {
  if(target.collision.powerup) {
    target.collision.powerup(entity.powerupType, entity.powerupData);
    entity.remove();
  }
};
