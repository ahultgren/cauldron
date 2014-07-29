'use strict';

/*jshint expr:true*/

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var utils = require('../utils');


var Entity = module.exports = function Entity (defaults, settings) {
  utils.extend(this, defaults, settings);

  this.input && this.input.init(this);
  this.physics && this.physics.init(this);
  this.collision && this.collision.init(this);
  this.script && this.script.init(this);
  this.graphics && this.graphics.init(this);
  this.output && this.output.init(this);
};

util.inherits(Entity, EventEmitter);


Entity.prototype.update = function() {
  this.input && this.input.update(this);
  this.physics && this.physics.update(this);
  this.collision && this.collision.update(this);
  this.script && this.script.update(this);
};

Entity.prototype.updateEvent = function() {
  this.output && this.output.updateEvent(this);
};

Entity.prototype.draw = function(ctx) {
  this.graphics && this.graphics.draw(this, ctx);
};
