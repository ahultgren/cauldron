'use strict';

var util = require('util');
var Component = require('../Component');


var Collision = module.exports = function PowerupCollision (settings) {
  this.constructor.super_.call(this, {}, settings);
};

util.inherits(Collision, Component);


Collision.prototype.type_ = 'obstacle';
Collision.prototype.response_ = 'zone';
Collision.prototype.boundingBox_ = 'circle';

Collision.prototype.init = function(enitity) {
  enitity.mediator.on('collision', this.onCollision);
};

Collision.prototype.update = function() {};
Collision.prototype.onCollision = function(entity, type, target) {
  if(target.data.isPlayer_) {
    target.powerups.add({
      type: entity.data.powerupType,
      data: entity.data.powerupData
    });

    entity.remove();
  }
};
