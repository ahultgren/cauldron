'use strict';

// Fulhack to convince browserify to require all weapons...
require('../models/ammunition/Beam');
require('../models/ammunition/Ball');
require('../models/ammunition/Rocket');


var utils = require('../utils');
var Entity = require('../components/entity.v2');
var AABB = require('../components/shapes/aabb');
var ammunitionModels = '../models/ammunition/';


module.exports = function (type, data) {
  var game = this;
  var model = require(ammunitionModels + type);

  data = utils.extend({
    mapPaths: game.map.data.paths,
    isAmmo_: true
  }, model.data, data);

  return Entity.create(data)
  .addComponent(AABB.create())
  .addComponent(model.components.Physics.create())
  .addComponent(model.components.Collision && model.components.Collision.create())
  .addComponent(model.components.Shape && model.components.Shape.create())
  .addStage2Component(model.components.Graphics.create())
  .init()
  .addTo(game);
};
