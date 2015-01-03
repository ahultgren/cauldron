'use strict';

// Fulhack to convince browserify to require all weapons...
require('../models/weapons/LaserCannon');
require('../models/weapons/AutoLaserCannon');
require('../models/weapons/PlasmaRifle');
require('../models/weapons/RocketLauncher');

var utils = require('../utils');
var weaponModelsPath = '../models/weapons/';

module.exports = function weaponFactory (name, data) {
  return utils.extend(require(weaponModelsPath + name), data);
};
