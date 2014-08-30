'use strict';

var utils = require('../utils');


var Data = module.exports = function Data (settings, doNotExtend) {
  utils.extend(this, settings);

  if(doNotExtend !== true) {
    this.last = new this.constructor(settings, true);
  }
  else {
    //## Somehow .last is copied even though it isn't enumerable. Force it to not recurse
    this.last = null;
  }
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
