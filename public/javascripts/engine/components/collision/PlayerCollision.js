'use strict';

var util = require('util');
var Component = require('../Component');


var Collision = module.exports = function BallCollision (settings) {
  this.constructor.super_.call(this, {}, settings);
};

util.inherits(Collision, Component);


Collision.prototype.type_ = 'collidable';
Collision.prototype.response_ = 'obstaclePhobic';
Collision.prototype.boundingBox_ = 'circle';

Collision.prototype.init = function(enitity) {
  enitity.mediator.on('collision', this.onCollision);
};

Collision.prototype.onCollision = function(entity, type, target) {
  var isAmmo = target && target.data.isAmmo_;
  var isSelf = target && target.data.playerId === entity.data.playerId;

  if(isAmmo && !isSelf) {
    entity.emit('hit', type, target);
    target.weapon.player.emit('hitEnemyPlayer', entity);
  }
};

Collision.prototype.update = function() {};
