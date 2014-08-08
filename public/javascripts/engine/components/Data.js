'use strict';

var utils = require('../utils');


var Data = module.exports = function Data (settings) {
  utils.extend(this, settings);
};


Data.prototype.update = function() {
  // Update last state
  //## Will not work well with objects... Just avoid them and use getters?
  this.last = new this.constructor(this);
};

/**
 * Create an "invisible" (non-enumerable) property for storing the last state.
 * That's important to make .last not recurse.
 */
Object.defineProperty(Data.prototype, 'last', {
  enumerable: false,
  writable: true,
  value: {}
});

/**
 * Helper for getting position as an object
 */
Object.defineProperty(Data.prototype, 'position', {
  get: function () {
    return {
      x: this.x,
      y: this.y
    };
  }
});
