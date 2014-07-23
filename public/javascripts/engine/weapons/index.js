'use strict';

// Fulhack to convince browserify to require all weapons...
require('./LaserCannon');
require('./AutoLaserCannon');

module.exports = function weaponFactory (name, settings) {
  var weapon = new (require('./' + name))(settings);

  weapon.name = name;

  return weapon;
};
