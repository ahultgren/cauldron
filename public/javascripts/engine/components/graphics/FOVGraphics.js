'use strict';

var util = require('util');
var utils = require('../../utils');
var Component = require('../Component');


var Graphics = module.exports = function FOVGraphics (settings) {
  this.constructor.super_.call(this, {
    fov: 0.8,
    peripheryDistance: 20
  }, settings);

  var basePolygon = [
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

  // Convert to cartesian coordinates
  this.path = basePolygon.map(function (point) {
    return {
      x: point.d * Math.cos(point.da),
      y: point.d * Math.sin(point.da)
    };
  });
};

util.inherits(Graphics, Component);


Graphics.prototype.type_ = 'visibilityPolygons';

Graphics.prototype.init = function(entity) {
  // Stalk player
  entity.data = this.player.data;
};

Graphics.prototype.draw = function(entity, ctx) {
  ctx.globalCompositeOperation = 'destination-in';

  utils.drawPolygon(this.path, ctx, '#fff');
};
