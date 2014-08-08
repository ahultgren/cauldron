'use strict';

// Fulhack to convince browserify to require all weapons...
require('../models/weapons/LaserCannon');
require('../models/weapons/AutoLaserCannon');
require('../models/weapons/PlasmaRifle');


var utils = require('../utils');
var Entity = require('../components/entity');
var WeaponScript = require('../components/script/WeaponScript');
var weaponModels = '../models/weapons/';

var defaultData = {
  lastShot: 0,
  shotInterval: 6,
  minAccuracy: 1,
  maxAccuracy: 0.1,
  spreadRange: 0.1,
  spread: 0.1
};


module.exports = function weaponFactory (name, components, data) {
  var game = this;

  data = utils.extend({}, defaultData, require(weaponModels + name), data);

  var weapon = new Entity({
    name: name,
    script: new WeaponScript({
      game: game,
      map: game.map
    })
    //factory: ammunitionFactory.bind(game) // is this a good way to decouple game from entities?
  }, components, data);

  game.add(weapon);

  return weapon;
};
