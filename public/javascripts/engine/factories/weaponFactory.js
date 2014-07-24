'use strict';

// Fulhack to convince browserify to require all weapons...
require('../weapons/LaserCannon');
require('../weapons/AutoLaserCannon');

var weaponsRoot = '../weapons/';


module.exports = function weaponFactory (name, settings) {
  var game = this;
  var weapon = new (require(weaponsRoot + name))(settings);

  /*
  weapon = new Entity({
    script: new WeaponScript(), // if(entity.mousedown && !entity.mousedown etc...)
    factory: ammunitionFactory.bind(game) // is this a good way to decouple game from entities?
  });
  game.add(weapon);
  */

  weapon.name = name;

  game.add(weapon);

  return weapon;
};