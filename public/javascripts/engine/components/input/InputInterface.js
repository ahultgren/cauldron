'use strict';

/**
 * Interface for Input Components. Doesn't do much in js but providing a
 * canonical reference for an input.
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var utils = require('../../utils');


var InputInterface = module.exports = function InputInterface (defaults, settings) {
  utils.extend(this, defaults, settings);
};

util.inherits(InputInterface, EventEmitter);


InputInterface.prototype.update = function(entity) {
  void(entity);
  throw(new Error(this.constructor.name + '#update is not implemented'));
};
