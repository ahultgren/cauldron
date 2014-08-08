'use strict';

// Fulhack to convince browserify to require all weapons...
require('../models/ammunition/Beam');
require('../models/ammunition/Ball');


var utils = require('../utils');
var Entity = require('../components/Entity');
var ammunitionModels = '../models/ammunition/';


module.exports = function (type, components, data) {
  var game = this;
  var model = require(ammunitionModels + type);
  var bullet;

  data = utils.extend({}, model.data, data);

  bullet = new Entity({
    physics: new model.components.Physics({
      segments: this.map.data.segments,
      game: game
    }),
    graphics: new model.components.Graphics(),
    collision: model.components.Collision && new model.components.Collision({
      game: game
    })
  }, components, data);

  game.add(bullet);

  return bullet;
};
