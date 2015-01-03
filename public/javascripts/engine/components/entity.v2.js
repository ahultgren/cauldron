'use strict';

var EventEmitter = require('events').EventEmitter;
var Data = require('./Data');


var Entity = module.exports = function Entity (data) {
  this.data = new Data(data);
  this.mediator = new EventEmitter();
  this.components = [];
  this.stage2Components = [];
};

Entity.create = function (data) {
  return new Entity(data);
};

Entity.prototype.init = function() {
  var self = this;

  self.components.forEach(function (component) {
    component.init(self);
  });

  self.stage2Components.forEach(function (component) {
    component.init(self);
  });

  return this;
};

Entity.prototype.update = function() {
  var self = this;

  self.data.update(self);

  self.components.forEach(function (component) {
    component.update(self);
  });

  return this;
};

Entity.prototype.updateStage2 = function(ctx) {
  var self = this;

  self.stage2Components.forEach(function (component) {
    component.update(self, ctx);
  });

  return this;
};

// Alias
Entity.prototype.draw = Entity.prototype.updateStage2;

Entity.prototype.addComponent = function(component) {
  this.components.push(component);
  return this;
};

Entity.prototype.addStage2Component = function(component) {
  this.stage2Components.push(component);
  return this;
};

// [TODO] Don't use this
Entity.prototype.onCollision = function(type, response) {
  this.mediator.emit('collision', this, type, response);
};

/**
 * Opposite of game.add()
 */
Entity.prototype.addTo = function(target) {
  target.add(this);
  return this;
};

/**
 * Should not be overwritten; tells the entity manager to remove the object from
 * the loop.
 */
Entity.prototype.remove = function() {
  var self = this;

  self.components.forEach(function (component) {
    component.remove(self);
  });

  self.stage2Components.forEach(function (component) {
    component.remove(self);
  });

  self.mediator.removeAllListeners();
  self.remove_ = true;

  return this;
};
