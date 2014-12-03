'use strict';

var util = require('util');
var Component = require('../Component');
var defaults = {};

var MockInput = module.exports = function MockInput (settings) {
  this.constructor.super_.call(this, defaults, settings);
};

util.inherits(MockInput, Component);


MockInput.prototype.update = function() {};

MockInput.prototype.isDown = function () {};

MockInput.prototype.getPosition = function () {};
