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
  if(target.isPlayer_) {
    target.powerups.add({
      type: entity.powerupType,
      data: entity.powerupData
    });

    entity.remove();
  }
};
