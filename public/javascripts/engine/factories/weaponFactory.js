'use strict';

// Fulhack to convince browserify to require all weapons...
require('../models/weapons/LaserCannon');
require('../models/weapons/AutoLaserCannon');
require('../models/weapons/PlasmaRifle');
require('../models/weapons/RocketLauncher');

var utils = require('../utils');
var Entity = require('../components/entity');
var WeaponScript = require('../components/script/WeaponScript');
var weaponModels = '../models/weapons/';

module.exports = function weaponFactory (name, components, data) {
  var game = this;

  data = utils.extend({}, require(weaponModels + name), data);

  var weapon = new Entity({
    name: name,
    script: WeaponScript.create()
  }, components, data);

  game.add(weapon);

  return weapon;
};
