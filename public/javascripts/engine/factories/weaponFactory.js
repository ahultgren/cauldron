'use strict';

// Fulhack to convince browserify to require all weapons...
require('../models/weapons/LaserCannon');
require('../models/weapons/AutoLaserCannon');


var utils = require('../utils');
var Entity = require('../components/entity');
var WeaponScript = require('../components/script/WeaponScript');
var weaponModels = '../models/weapons/';
var defaults = {
  lastShot: 0,
  shotInterval: 6,
  minAccuracy: 1,
  maxAccuracy: 0.1,
  spreadRange: 0.1,
  spread: 0.1
};


module.exports = function weaponFactory (name, settings) {
  var game = this;

  settings = utils.extend({
    script: new WeaponScript({
      game: game,
      map: game.map
    })
    //factory: ammunitionFactory.bind(game) // is this a good way to decouple game from entities?
  }, defaults, require(weaponModels + name), settings);

  var weapon = new Entity(settings);

  weapon.name = name;

  game.add(weapon);

  return weapon;
};
