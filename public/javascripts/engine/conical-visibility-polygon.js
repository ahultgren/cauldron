'use strict';

var utils = require('./utils');

var Polygon = module.exports = function (segments, player) {
  //## This is a bit ugly, refactor when you have a better idea
  this._type = 'visibilityPolygons';

  this.segments = segments;
  this.player = player;
  this.fuzzyRadius = 10;
  this.fov = 0.4;
  this.peripheryDistance = 20;

  this.basePolygon = [
    /*{
      da - delta angle (difference from player angle)
      d - distance (from player)
    }*/
    {
      da: this.fov,
      d: 9999
    },
    {
      da: Math.PI/3*2,
      d: this.peripheryDistance
    },
    {
      da: Math.PI,
      d: this.peripheryDistance
    },
    {
      da: -Math.PI/3*2,
      d: this.peripheryDistance
    },
    {
      da: -this.fov,
      d: 9999
    }
  ];
};

Polygon.prototype.draw = function(ctx) {
  var polygon = this.basePolygon;
  var player = this.player;

  ctx.globalCompositeOperation = 'destination-in';

  // Translate polygon relative to player
  polygon.map(function (point) {
    var a = point.da + player.a;

    point.x = player.x + point.d * Math.cos(a);
    point.y = player.y + point.d * Math.sin(a);
  });

  utils.drawPolygon(polygon, ctx, '#fff');
};
