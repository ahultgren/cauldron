'use strict';

var R = require('ramda');
var utils = require('../utils');
var Entity = require('../components/Entity.v2');
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


module.exports = function playerFactory (components, stage2, data) {
  var game = this;
  var player;

  data = utils.extend({
    playerId: generateId() + generateId() + generateId()
  }, defaultData, data);

  player = Entity.create(data);

  [
    PlayerGraphics.create()
  ].concat(stage2).forEach(function (component) {
    player.addStage2Component(component);
  });

  [
    PlayerPhysics.create(),
    Collision.create(),
    AABB.create(),
    Circle.create()
  ].concat(R.values(components)).forEach(function (component) {
    player.addComponent(component);
  });

  // [TODO] Don't use named components
  if(components.input) {
    player.input = components.input;
  }
/*
  if(player.weapon) {
    // [TODO] Is this still needed?
    player.weapon.player = player;
    player.weapon.data.playerId = data.playerId;
  }
*/
  game.add(player.init());

  return player;
};

function generateId () {
  return Math.random().toString(16).substring(2);
}
