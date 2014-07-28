'use strict';

// Fulhack to convince browserify to require all weapons...
require('../models/ammunition/Beam');


var utils = require('../utils');
var Entity = require('../components/Entity');
var ammunitionModels = '../models/ammunition/';
var defaults = {
  _type: 'masked',
  aliveUntil: 2,
  aliveFor: 0
};


module.exports = function (type, settings) {
  var game = this;
  var bullet;
  var model = require(ammunitionModels + type);

  settings = utils.extend({
    physics: new model.components.Physics({
      segments: this.map.segments
    }),
    graphics: new model.components.Graphics(),
  }, defaults, settings);

  bullet = new Entity(settings);

  game.add(bullet);

  return bullet;
};
