'use strict';

var utils = require('../utils');
var Entity = require('../components/Entity');
var Graphics = require('../components/graphics/PowerupGraphics');
var Collision = require('../components/collision/PowerupCollision');

var defaultData = {
  stroke: '#2d0',
  radius: 10,
  strokeWidth: 2
};


module.exports = exports = function powerupFactory (components, data) {
  var game = this;

  data = utils.extend({
    x: Math.random() * game.canvas.width,
    y: Math.random() * game.canvas.height,
  }, defaultData, data);

  return new Entity({
    graphics: new Graphics(),
    collision: new Collision()
  }, components, data);
};
