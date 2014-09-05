'use strict';

/*jshint expr:true*/

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var Data = require('./Data');
var utils = require('../utils');


var Entity = module.exports = function Entity (defaults, settings, data) {
  utils.extend(this, defaults, settings);

  this.data = new Data(data);

  this.input && this.input.init(this);
  this.physics && this.physics.init(this);
  this.collision && this.collision.init(this);
  this.script && this.script.init(this);
  this.graphics && this.graphics.init(this);
  this.output && this.output.init(this);
  this.powerups && this.powerups.init(this);
  this.aabb && this.aabb.init(this);
  this.shape && this.shape.init(this);
};

util.inherits(Entity, EventEmitter);


Entity.prototype.update = function() {
  this.data.update(this);
  this.input && this.input.update(this);
  this.physics && this.physics.update(this);
  this.collision && this.collision.update(this);
  this.script && this.script.update(this);
  this.powerups && this.powerups.update(this);
  this.aabb && this.aabb.update(this);
  this.shape && this.shape.update(this);
};

Entity.prototype.updateEvent = function() {
  this.output && this.output.updateEvent(this);
};

Entity.prototype.draw = function(ctx) {
  this.graphics && this.graphics.draw(this, ctx);
};

Entity.prototype.onCollision = function(type, response) {
  this.collision && this.collision.onCollision(this, type, response);
};

/**
 * Should not be overwritten; tells the entity manager to remove the object from
 * the loop.
 */
Entity.prototype.remove = function() {
  this.input && this.input.remove(this);
  this.physics && this.physics.remove(this);
  this.collision && this.collision.remove(this);
  this.script && this.script.remove(this);
  this.graphics && this.graphics.remove(this);
  this.output && this.output.remove(this);

  this.removeAllListeners();
  this.remove_ = true;
};

/**
 * Notifies a component that it's being replaced with another instance.
 */
Entity.prototype.replace = function(name, newComponent) {
  this[name].emit('replaced', newComponent);
  this[name].remove();
  this[name] = newComponent;
  newComponent.init && newComponent.init(this);
};
