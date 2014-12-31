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
    mapPaths: game.map.data.paths,
    isAmmo_: true
  }, model.data, data);

  return Entity.create({
    physics: model.components.Physics.create(),
    graphics: model.components.Graphics.create(),
    collision: model.components.Collision && model.components.Collision.create(),
    aabb: AABB.create(),
    shape: model.components.Shape && model.components.Shape.create()
  }, components, data)
  .addTo(game);
};
