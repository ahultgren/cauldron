'use strict';

var utils = require('../utils');
var Entity = require('../components/Entity');
var PowerupGraphics = require('../components/graphics/PowerupGraphics');
var Collision = require('../components/collision/PowerupCollision');
var AABB = require('../components/shapes/aabb');
var Circle = require('../components/shapes/circle');

module.exports = exports = function powerupFactory (components, data) {
  var game = this;

  data = utils.extend({
    x: Math.random() * game.canvas.width,
    y: Math.random() * game.canvas.height,
  }, data);

  return new Entity({
    graphics: PowerupGraphics.create(),
    collision: new Collision(),
    aabb: new AABB(),
    shape: new Circle()
  }, components, data);
};
