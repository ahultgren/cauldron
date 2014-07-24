'use strict';

/*jshint expr:true*/

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var utils = require('../utils');


var Entity = module.exports = function Entity (defaults, settings) {
  utils.extend(this, defaults, settings);
};

util.inherits(Entity, EventEmitter);


Entity.prototype.update = function() {
  this.input && this.input.update(this);
  this.physics && this.physics.update(this);
  this.script && this.script.update(this);

  this.emit('update');
};


Entity.prototype.draw = function(ctx) {
  this.graphics && this.graphics.draw(this, ctx);
};
