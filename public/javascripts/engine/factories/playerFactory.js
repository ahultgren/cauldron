'use strict';

var utils = require('../utils');
var Entity = require('../components/entity');
var PlayerPhysics = require('../components/physics/PlayerPhysics');
var PlayerGraphics = require('../components/graphics/PlayerGraphics');
var Collision = require('../components/collision/PlayerCollision');
var AABB = require('../components/shapes/aabb');
var Circle = require('../components/shapes/circle');
var masked = require('../components/graphicsType/masked');

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

  stage2 = stage2 || [];

  data = utils.extend({
    playerId: generateId() + generateId() + generateId()
  }, defaultData, data);

  return Entity.create(data)
  .addComponents([
    PlayerPhysics.create(),
    Collision.create(),
    AABB.create(),
    Circle.create(),
    masked.create()
  ])
  .addComponents(components)
  .addStage2Components([PlayerGraphics.create()])
  .addStage2Components(stage2)
  .init()
  .addTo(game);
};

function generateId () {
  return Math.random().toString(16).substring(2);
}
