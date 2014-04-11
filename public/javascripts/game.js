'use strict';

/*jshint -W079 */

var canvas = require('./canvas');
var Loop = require('./loop');
var Map = require('./map');
var Player = require('./player');
var Laser = require('./laser');
var Cursor = require('./cursor');
var VisibilityPolygon = require('./visibility-polygon');


var Game = module.exports = function (settings) {
  var self = this;

  self.canvas = canvas;
  self.loop = new Loop(self.canvas, self.ctx);

  self.map = new Map(settings.map(self.canvas));
  self.loop.alwaysVisible.push(self.map);

  // Player one

  self.playerOne = new Player(self.map, self.canvas.width/2, self.canvas.height/2);
  self.loop.moving.push(self.playerOne);
  self.loop.masked.push(self.playerOne);

  self.playerOne.weapon = new Laser(self);

  self.cursor = new Cursor();
  self.loop.alwaysVisible.push(self.cursor);

  self.visibilityPolygon = new VisibilityPolygon(self.map.segments, self.playerOne);
  self.loop.visibilityPolygons.push(self.visibilityPolygon);
};


Game.prototype.start = function() {
  this.loop.start();
};
