'use strict';

// Fulhack to convince browserify to require all weapons...
require('../models/weapons/LaserCannon');
require('../models/weapons/AutoLaserCannon');

var utils = require('../utils');
var Weapon = require('../weapons/weapon');
var weaponModels = '../models/weapons/';


module.exports = function weaponFactory (name, settings) {
  var game = this;

  settings = utils.extend({
    game: game,
    map: game.map
  }, require(weaponModels + name), settings);

  var weapon = new Weapon(settings);

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
