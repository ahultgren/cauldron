'use strict';

var util = require('util');
var Component = require('../Component');


var Graphics = module.exports = function MapGraphics (settings) {
  this.constructor.super_.call(this, {}, settings);
};

util.inherits(Graphics, Component);


Graphics.prototype.type_ = 'masked';

Graphics.prototype.init = function(entity) {
  var map = entity.data.paths;

  // Add map borders
  map.unshift(
    [{x: 0, y: 0}, {x: map.width, y: 0}],
    [{x: map.width, y: 0}, {x: map.width, y: map.height}],
    [{x: map.width, y: map.height}, {x: 0, y: map.height}],
    [{x: 0, y: map.height}, {x: 0, y: 0}]
  );

  entity.data.map = map; // Alias for paths
};

Graphics.prototype.draw = function(entity, ctx) {
  ctx.strokeStyle = '#c33';
  ctx.lineWidth = 2;
  ctx.beginPath();

  entity.data.paths.forEach(function (path) {
    ctx.moveTo(path[0].x, path[0].y);
    ctx.lineTo(path[1].x, path[1].y);
  });

  ctx.stroke();
};
