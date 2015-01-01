'use strict';

// Fulhack to convince browserify to require all weapons...
require('../models/weapons/LaserCannon');
require('../models/weapons/AutoLaserCannon');
require('../models/weapons/PlasmaRifle');
require('../models/weapons/RocketLauncher');

var utils = require('../utils');
var Entity = require('../components/entity.v2');
var WeaponScript = require('../components/script/WeaponScript');
var weaponModels = '../models/weapons/';

module.exports = function weaponFactory (name, components, data) {
  var game = this;

  data = utils.extend({
    name: name
  }, require(weaponModels + name), data);

  var weapon = Entity.create(data)
    .addComponent(WeaponScript.create())
    .init()
    .addTo(game);

  // [TODO] This is obsolete. Find another way
  if(components && components.player) {
    weapon.player = components.player;
  }

  return weapon;
};
