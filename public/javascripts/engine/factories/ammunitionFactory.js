'use strict';

// Fulhack to convince browserify to require all weapons...
require('../models/ammunition/Beam');
require('../models/ammunition/Ball');
require('../models/ammunition/Rocket');


var R = require('ramda');
var utils = require('../utils');
var Entity = require('../components/entity');
var AABB = require('../components/shapes/aabb');
var ammunitionModels = '../models/ammunition/';
var masked = require('../components/graphicsType/masked');

module.exports = function (type, data) {
  var game = this;
  var model = require(ammunitionModels + type);

  data = utils.extend({
    mapPaths: game.map.data.paths,
    isAmmo_: true
  }, model.data, data);

  return Entity.create(data)
  .addComponents([
    AABB.create(),
    masked.create()
  ])
  .addComponents(model.components.map(R.func('create')))
  .addStage2Components(model.stage2Components.map(R.func('create')))
  .init()
  .addTo(game);
};
