'use strict';

var util = require('util');
var Component = require('../Component');


var Collision = module.exports = function BallCollision (settings) {
  this.constructor.super_.call(this, {}, settings);
};

util.inherits(Collision, Component);

Collision.prototype.response_ = 'obstaclePhobic';


Collision.prototype.update = function() {};
Collision.prototype.onCollision = function() {};
