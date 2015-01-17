'use strict';

var utils = require('../utils');
var Entity = require('../components/entity');
var frictionMovement = require('../components/movement/frictionMovement');
var linearMovement = require('../components/movement/linearMovement');
var CircleSegmentGraphics = require('../components/graphics/CircleSegmentGraphics');
var Collision = require('../components/collision/PlayerCollision');
var AABB = require('../components/shapes/aabb');
var Circle = require('../components/shapes/circle');
var masked = require('../components/graphicsType/masked');

var defaultData = {
  radius: 7,
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
    frictionMovement.create(),
    linearMovement.create(),
    Collision.create(),
    AABB.create(),
    Circle.create(),
    masked.create()
  ])
  .addComponents(components)
  .addStage2Component(CircleSegmentGraphics.create())
  .addStage2Components(stage2)
  .init()
  .addTo(game);
};

function generateId () {
  return Math.random().toString(16).substring(2);
}
