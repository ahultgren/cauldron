'use strict';

/**
 * Retracts from any obstacle it collides with, just enough to not touch them,
 * but does not bounce or so.
 */

var util = require('util');
var utils = require('../../utils');
var Component = require('../Component');


var Collision = module.exports = function ObstaclePhobicCollision (settings) {
  this.constructor.super_.call(this, {}, settings);
};

util.inherits(Collision, Component);


Collision.prototype.update = function(entity) {
  if(this.newData) {
    utils.extend(entity, this.newData);
    this.newData = null;
  }
};

Collision.prototype.onCollision = function(type, response) {
  this.newData = response;
  this.emit(type);
};
