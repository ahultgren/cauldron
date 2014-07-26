'use strict';

var utils = require('../utils');
var Entity = require('../components/Entity');
var PlayerPhysics = require('../components/physics/PlayerPhysics');
var PlayerGraphics = require('../components/graphics/PlayerGraphics');

var defaults = {
  _type: 'masked',
  radius: 5,
  x: 0,
  y: 0,
  a: 0,
  dx: 0,
  dy: 0,
  acc: 0.8,
  friction: 0.8,
  fill: '#'+Math.floor(Math.random()*4095).toString(16)
};


module.exports = function playerFactory (playerSettings) {
  var game = this;

  var settings = utils.extend({}, defaults, playerSettings, {
    physics: new PlayerPhysics({
      map: game.map
    }),
    graphics: new PlayerGraphics()
  });

  var player = new Entity(settings);

  game.add(player);

  return player;
};
