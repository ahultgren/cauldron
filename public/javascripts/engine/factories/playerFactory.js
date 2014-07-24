'use strict';

var utils = require('../utils');
var Player = require('../player');
var PlayerPhysics = require('../components/physics/PlayerPhysics');
var PlayerGraphics = require('../components/graphics/PlayerGraphics');

var required = {
  x: 0,
  y: 0,
  a: 0
};


module.exports = function playerFactory (playerSettings, factorySettings) {
  var game = this;

  var settings = utils.extend(required, playerSettings, {
    physics: new PlayerPhysics({
      map: factorySettings.map
    }),
    graphics: new PlayerGraphics()
  });

  var player = new Player(settings);

  game.add(player);

  return player;
};
