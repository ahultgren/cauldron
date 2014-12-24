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

Collision.prototype.onCollision = function(enitity, type, target) {
  var isAmmo = target && target.data.isAmmo_;
  var isSelf = target && target.weapon === enitity.weapon;

  if(isAmmo && !isSelf) {
    enitity.emit('hit', type, target);
    target.weapon.player.emit('hitEnemyPlayer', enitity);
  }
};
Collision.prototype.update = function() {};
