'use strict';

// Fulhack to convince browserify to require all weapons...
require('../models/ammunition/Beam');
require('../models/ammunition/Ball');
require('../models/ammunition/Rocket');


var utils = require('../utils');
var Entity = require('../components/entity');
var AABB = require('../components/shapes/aabb');
var ammunitionModels = '../models/ammunition/';
var masked = require('../components/graphicsType/masked');

module.exports = function (type, player, from, toward, spread) {
  var game = this;
  var model = require(ammunitionModels + type);
  var angle = Math.atan2(toward.y - from.data.y, toward.x - from.data.x) + spread;

  var data = utils.extend({
    mapPaths: game.map.data.paths,
    isAmmo_: true,
  },
  model.data,
  player.data.ammunitionData,
  {
    toward: toward,
    spread: spread,
    player: player,
    playerId: player.data.playerId,
    color: player.data.fill,
    a: angle
  });

  data.from = offsetFrom(from, player, data, angle);

  return Entity.create(data)
  .addComponents(model.components.map(create))
  .addComponents([
    AABB.create(),
    masked.create()
  ])
  .addStage2Components(model.stage2Components.map(create))
  .init()
  .addTo(game);
};

/**
 * Support passing arguments to .create() using an array
 */
function create (component) {
  if(Array.isArray(component)) {
    return component[0].create.apply(component[0], component.slice(1));
  }

  return component.create();
}

/**
 * Spawn projectile a bit away from the player
 */
function offsetFrom (from, player, modelData, angle) {
  var ammoRadius = modelData.radius || modelData.halfWidth || 0;

  if(player.data.radius) {
    return {
      // [TODO] Deprecate the extra `data`-level?
      data: {
        x: from.data.x + Math.cos(angle) * (player.data.radius + ammoRadius + 1),
        y: from.data.y + Math.sin(angle) * (player.data.radius + ammoRadius + 1)
      }
    };
  }

  return from;
}
