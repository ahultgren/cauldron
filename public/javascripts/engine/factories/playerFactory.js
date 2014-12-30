'use strict';

var utils = require('../utils');
var Entity = require('../components/Entity');
var PlayerPhysics = require('../components/physics/PlayerPhysics');
var PlayerGraphics = require('../components/graphics/PlayerGraphics');
var Collision = require('../components/collision/PlayerCollision');
var AABB = require('../components/shapes/aabb');
var Circle = require('../components/shapes/circle');

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

  data = utils.extend({
    playerId: generateId() + generateId() + generateId()
  }, defaultData, data);

  player = new Entity({
    physics: PlayerPhysics.create(),
    graphics: PlayerGraphics.create(),
    collision: new Collision({
      game: game
    }),
    aabb: new AABB(),
    shape: Circle.create()
  }, components, data);

  if(player.weapon) {
    // [TODO] Is this still needed?
    player.weapon.player = player;
    player.weapon.data.playerId = data.playerId;
  }

  game.add(player);

  return player;
};

function generateId () {
  return Math.random().toString(16).substring(2);
}
