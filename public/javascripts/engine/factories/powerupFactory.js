'use strict';

var utils = require('../utils');
var Entity = require('../components/Entity');
var Graphics = require('../components/graphics/PowerupGraphics');
var defaults = {
  stroke: '#2d0',
  radius: 10,
  strokeWidth: 2
};


module.exports = exports = function powerupFactory (settings) {
  var game = this;

  settings = utils.extend({
    type_: 'masked',
    x: Math.random() * game.canvas.width,
    y: Math.random() * game.canvas.height,
    graphics: new Graphics()
  }, defaults, settings);

  console.log(settings);

  return new Entity(settings);
};
