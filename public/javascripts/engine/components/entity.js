'use strict';

var R = require('ramda');
var EventEmitter = require('events').EventEmitter;
var Data = require('./Data');
var push = Array.prototype.push;

var Entity = module.exports = function Entity (data) {
  this.data = new Data(data);
  this.mediator = new EventEmitter();

  this.initable = [];
  this.components = [];
  this.stage2Components = [];
  this.removable = [];
};

Entity.create = function (data) {
  return new Entity(data);
};

Entity.prototype.init = function() {
  this.initable.forEach(R.nAry(1, R.rPartial(R.func('init'), this)));
  this.initable = [];

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

/**
 * Tells the entity manager to remove the object from the loop.
 */
Entity.prototype.remove = function() {
  this.removable.forEach(R.nAry(1, R.rPartial(R.func('init'), this)));
  this.mediator.removeAllListeners();
  this.remove_ = true;

  return this;
};

Entity.prototype.addComponent = function(component) {
  if(!component) {
    return this;
  }

  this.addUpdatable(this.components, arguments);
  this.addInitable(arguments);
  this.addRemovable(arguments);

  return this;
};

Entity.prototype.addStage2Component = function(component) {
  if(!component) {
    return this;
  }

  this.addUpdatable(this.stage2Components, arguments);
  this.addInitable(arguments);
  this.addRemovable(arguments);

  return this;
};

Entity.prototype.addComponents = function(components) {
  return this.addComponent.apply(this, components);
};

Entity.prototype.addStage2Components = function(components) {
  return this.addStage2Component.apply(this, components);
};

Entity.prototype.addInitable = function(components) {
  var pushToInitable = R.nAry(1, push.bind(this.initable));
  R.filter(R.hasIn('init'), components).forEach(pushToInitable);
  return this;
};

Entity.prototype.addUpdatable = function(target, components) {
  var pushToTarget = R.nAry(1, push.bind(target));
  R.filter(R.hasIn('update'), components).forEach(pushToTarget);
  return this;
};

Entity.prototype.addRemovable = function(components) {
  var pushToRemovable = R.nAry(1, push.bind(this.removable));
  R.filter(R.hasIn('remove'), components).forEach(pushToRemovable);
  return this;
};

/**
 * Opposite of game.add()
 */
Entity.prototype.addTo = function(target) {
  target.add(this);
  return this;
};
