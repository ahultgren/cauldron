'use strict';

var utils = require('../utils');
var Entity = require('../components/entity');
var ConcentricalGraphics = require('../components/graphics/ConcentricalGraphics');
var Collision = require('../components/collision/PowerupCollision');
var AABB = require('../components/shapes/aabb');
var Circles = require('../components/shapes/circles');
var masked = require('../components/graphicsType/masked');

module.exports = exports = function powerupFactory (data) {
  var game = this;

  data = utils.extend({
    x: Math.random() * game.canvas.width,
    y: Math.random() * game.canvas.height,
  }, data);

  return Entity.create(data)
  .addComponent(Collision.create(), Circles.create(), AABB.create(), masked.create())
  .addStage2Component(ConcentricalGraphics.create())
  .init();
};
