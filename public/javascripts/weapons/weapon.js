'use strict';

var utils = require('../utils');


/**
 * Weapon interface.
 */

//## Extend this to automatically set behavior based on properties like
//## .ammo, .poolSize, .interval, .automatic (.recoil, .weight)
var Weapon = module.exports = function (settings) {
  utils.extend(this, settings);
};

Weapon.prototype.triggerStart = function() {
};

Weapon.prototype.triggerEnd = function() {
};
