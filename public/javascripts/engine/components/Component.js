'use strict';

/**
 * Interface/base class for Components. Doesn't do much in js but providing a
 * canonical reference and function definitions.
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var utils = require('../utils');


var Component = module.exports = function Component (defaults, settings) {
  utils.extend(this, defaults, settings);
};

util.inherits(Component, EventEmitter);


Component.prototype.init = function (/*entity*/) {
};

Component.prototype.update = function(entity) {
  void(entity); // lint hack
  throw(new Error(this.constructor.name + '#update is not implemented'));
};

Component.prototype.draw = null; /* (entity, ctx) */