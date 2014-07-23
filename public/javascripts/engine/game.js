'use strict';

/*jshint -W079 */

var canvas = require('./canvas');
var Loop = require('./loop');
var Map = require('./map');
var Physics = require('./physics');
var Graphics = require('./graphics');
var Player = require('./player');
var Laser = require('./weapons/auto-laser-cannon');
var Cursor = require('./cursor');
var VisibilityPolygon = require('./visibility-polygon');
var CVP = require('./conical-visibility-polygon');
var Network = require('./network');
var LocalInput = require('./input/LocalInput');


var Game = module.exports = function (settings) {
  var self = this;

  // Map

  self.canvas = canvas;
  self.loop = new Loop(self.canvas, self.ctx);

  self.map = new Map(settings.map(self.canvas));
  self.add(self.map);

  // Player one

  self.playerOne = new Player({
    input: new LocalInput(),
    physics: new Physics({
      map: self.map
    }),
    graphics: new Graphics(),
    x: self.canvas.width/2,
    y: self.canvas.height/2,
    weapon: new Laser({
      game: self,
      map: self.map
    })
  });

  self.add(self.playerOne);

  self.cursor = new Cursor();
  self.add(self.cursor);

  // Network

  self.network = new Network(self);
  self.network.setLocalPlayer(self.playerOne);

  // Visibility polygon

  self.visibilityPolygon = new VisibilityPolygon(self.map.segments, self.playerOne);
  self.add(self.visibilityPolygon);

  self.visibilityPolygon = new CVP(self.map.segments, self.playerOne);
  self.add(self.visibilityPolygon);
};


Game.prototype.add = function (object) {
  if(object._type && this.loop[object._type]) {
    this.loop[object._type].push(object);
  }

  if(object.update) {
    this.loop.updating.push(object);
  }
  else if(object._isObstacle) {
    this.loop.obstacles.push(object);
  }

  return this;
};


Game.prototype.start = function() {
  this.loop.start();
};
