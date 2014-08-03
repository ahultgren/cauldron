'use strict';

var util = require('util');
var utils = require('../../utils');
var Component = require('../Component');


var Graphics = module.exports = function FOVGraphics (settings) {
  this.constructor.super_.call(this, {
    fov: 0.8,
    peripheryDistance: 20
  }, settings);

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

util.inherits(Graphics, Component);


Graphics.prototype.draw = function(entity, ctx) {
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
