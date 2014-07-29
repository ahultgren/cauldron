'use strict';

var utils = require('../utils');
var Entity = require('../components/Entity');
var PlayerPhysics = require('../components/physics/PlayerPhysics');
var PlayerGraphics = require('../components/graphics/PlayerGraphics');
var Collision = require('../components/collision/ObstaclePhobicCollision');

var defaults = {
  type_: 'masked',
  radius: 5,
  x: 0,
  y: 0,
  a: 0,
  dx: 0,
  dy: 0,
  acc: 0.8,
  friction: 0.8,
  fill: '#'+(Math.random().toString(16)+'000').slice(2,5)
};


module.exports = function playerFactory (playerSettings) {
  var game = this;

  var settings = utils.extend({}, defaults, playerSettings, {
    physics: new PlayerPhysics({
      map: game.map,
      game: game
    }),
    graphics: new PlayerGraphics(),
    collision: new Collision()
  });

  var player = new Entity(settings);

  game.add(player);

  return player;
};
