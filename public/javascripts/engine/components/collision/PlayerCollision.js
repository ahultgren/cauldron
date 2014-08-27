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

Collision.prototype.onCollision = function(enitity, type, target) {
  if(target && target.weapon && enitity.weapon !== target.weapon) {
    //## Differ between player and ammunition. Or create an abstract way of identifying anything. Damn components
    enitity.emit('hit', type, target);
  }
};
Collision.prototype.update = function() {};
