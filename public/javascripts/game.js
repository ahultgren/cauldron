'use strict';

/*jshint -W079 */

var canvas = require('./canvas');
var Loop = require('./loop');
var Map = require('./map');
var Player = require('./player');
var Cursor = require('./cursor');
var VisibilityPolygon = require('./visibility-polygon');


var Game = module.exports = function (map) {
  var self = this;

  self.loop = new Loop();

  self.map = new Map(map(canvas));
  self.loop.alwaysVisible.push(self.map);

  self.playerOne = new Player(self.map, canvas.width/2, canvas.height/2);
  self.loop.moving.push(self.playerOne);
  self.loop.masked.push(self.playerOne);

  self.cursor = new Cursor();
  self.loop.alwaysVisible.push(self.cursor);

  self.visibilityPolygon = new VisibilityPolygon(self, self.playerOne);
  self.loop.visibilityPolygons.push(self.visibilityPolygon);
};


Game.prototype.start = function() {
  this.loop.start();
};
