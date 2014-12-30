'use strict';

var utils = require('../../utils');
var Graphics = module.exports = exports;

Graphics.type_ = 'visibilityPolygons';

Graphics.create = function () {
  return Graphics;
};

Graphics.init = function (entity) {
  entity.data.fov = entity.data.fov || 0.8;
  entity.data.peripheryDistance = entity.data.peripheryDistance || 20;

  entity.data.path = createCartesianPath(createBasePolygon(entity));
  entity.data.player = entity.data.player;

  entity.data.gco_ = Graphics.type_;
};

Graphics.update = function(entity, ctx) {
  ctx.globalCompositeOperation = 'destination-in';

  // [TODO] This should cause the FOV to lag behind a tiny bit.
  // Use a separate stage 1 component to fix it.
  // Maybe a general stalk-component can be used for that? like:
  // fov.addComponent(stalker.create(player, ['x', 'y', 'a']))
  entity.data.x = entity.data.player.data.x;
  entity.data.y = entity.data.player.data.y;
  entity.data.a = entity.data.player.data.a;
  utils.drawPolygon(entity.data.path, ctx, '#fff');
};

/* Helpers
============================================================================= */

function createCartesianPath (path) {
  return path.map(makePointCartesian);
}

function makePointCartesian (point) {
  return {
    x: point.d * Math.cos(point.da),
    y: point.d * Math.sin(point.da)
  };
}
function createBasePolygon (entity) {
  return [
    /*{
      da - delta angle (difference from player angle)
      d - distance (from player)
    }*/
    {
      da: entity.data.fov,
      d: 9999
    },
    {
      da: Math.PI/3*2,
      d: entity.data.peripheryDistance
    },
    {
      da: Math.PI,
      d: entity.data.peripheryDistance
    },
    {
      da: -Math.PI/3*2,
      d: entity.data.peripheryDistance
    },
    {
      da: -entity.data.fov,
      d: 9999
    }
  ];
}
