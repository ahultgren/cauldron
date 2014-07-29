'use strict';

// Fulhack to convince browserify to require all weapons...
require('../models/ammunition/Beam');
require('../models/ammunition/Ball');


var utils = require('../utils');
var Entity = require('../components/Entity');
var ammunitionModels = '../models/ammunition/';


module.exports = function (type, settings) {
  var game = this;
  var bullet;
  var model = require(ammunitionModels + type);

  settings = utils.extend({
    type_: 'masked',
    physics: new model.components.Physics({
      segments: this.map.segments
    }),
    graphics: new model.components.Graphics(),
    collision: new model.components.Collision()
  }, model.settings, settings);

  bullet = new Entity(settings);

  game.add(bullet);

  return bullet;
};
