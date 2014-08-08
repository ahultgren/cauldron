'use strict';

var utils = require('../utils');
var Entity = require('../components/Entity');
var PlayerPhysics = require('../components/physics/PlayerPhysics');
var PlayerGraphics = require('../components/graphics/PlayerGraphics');
var Collision = require('../components/collision/PlayerCollision');

var defaultData = {
  radius: 5,
  x: 0,
  y: 0,
  a: 0,
  dx: 0,
  dy: 0,
  acc: 0.8,
  friction: 0.8,
  fill: '#'+(Math.random().toString(16)+'000').slice(2,5),
  isPlayer_: true
};


module.exports = function playerFactory (components, data) {
  var game = this;
  var player;

  data = utils.extend({}, defaultData, data);

  player = new Entity({
    physics: new PlayerPhysics({
      map: game.map,
      game: game
    }),
    graphics: new PlayerGraphics(),
    collision: new Collision({
      game: game
    })
  }, components, data);

  game.add(player);

  return player;
};
