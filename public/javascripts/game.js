'use strict';

/*jshint -W079 */

var canvas = require('./canvas');
var Loop = require('./loop');
var Map = require('./map');
var Player = require('./player');
var Laser = require('./weapons/auto-laser-cannon');
var Cursor = require('./cursor');
var VisibilityPolygon = require('./visibility-polygon');
var Network = require('./network');
var stdin = require('./input/stdin');


var Game = module.exports = function (settings) {
  var self = this;

  // Map

  self.canvas = canvas;
  self.loop = new Loop(self.canvas, self.ctx);

  self.map = new Map(settings.map(self.canvas));
  self.add('alwaysVisible', self.map);

  // Player one

  self.playerOne = new Player({
    map: self.map,
    x: self.canvas.width/2,
    y: self.canvas.height/2,
    input: new stdin(),
    weapon: new Laser({
      game: self,
      map: self.map
    })
  });

  self.add('moving', self.playerOne);
  self.add('masked', self.playerOne);

  self.cursor = new Cursor();
  self.add('alwaysVisible', self.cursor);

  // Network

  self.network = new Network(self);
  self.network.setLocalPlayer(self.playerOne);

  // Visibility polygon

  self.visibilityPolygon = new VisibilityPolygon(self.map.segments, self.playerOne);
  self.add('visibilityPolygons', self.visibilityPolygon);
};


Game.prototype.add = function (type, object) {
  if(this.loop[type]) {
    this.loop[type].push(object);
  }
  else {
    throw new Error('The type ' + type + ' does not exist');
  }

  return this;
};


Game.prototype.start = function() {
  this.loop.start();
};
