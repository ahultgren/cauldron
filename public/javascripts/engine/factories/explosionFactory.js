'use strict';

var Entity = require('../components/entity');
var ExplosionGraphics = require('../components/graphics/ExplosionGraphics');
var masked = require('../components/graphicsType/masked');

module.exports = function (data) {
  return Entity.create(data)
  .addComponent(masked.create())
  .addStage2Component(ExplosionGraphics.create())
  .init()
  .addTo(this);
};
