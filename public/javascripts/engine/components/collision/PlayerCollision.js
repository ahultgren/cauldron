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

Collision.prototype.onCollision = function() {};
Collision.prototype.update = function() {};
