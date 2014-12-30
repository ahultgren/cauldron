'use strict';

// Fulhack to convince browserify to require all weapons...
require('../models/ammunition/Beam');
require('../models/ammunition/Ball');
require('../models/ammunition/Rocket');


var utils = require('../utils');
var Entity = require('../components/Entity');
var AABB = require('../components/shapes/aabb');
var ammunitionModels = '../models/ammunition/';


module.exports = function (type, components, data) {
  var game = this;
  var model = require(ammunitionModels + type);

  data = utils.extend({
    isAmmo_: true
  }, model.data, data);

  return Entity.create({
    physics: new model.components.Physics({
      paths: game.map.data.paths,
      game: game
    }),
    graphics: model.components.Graphics.create(),
    collision: model.components.Collision && new model.components.Collision({
      game: game
    }),
    aabb: new AABB(),
    shape: model.components.Shape && new model.components.Shape()
  }, components, data)
  .addTo(game);
};
