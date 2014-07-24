'use strict';

/*jshint -W079 */

var canvas = require('./canvas');
var Loop = require('./loop');
var Map = require('./map');
var Cursor = require('./cursor');
var VisibilityPolygon = require('./visibility-polygon');
var CVP = require('./conical-visibility-polygon');
var Network = require('./network');
var LocalInput = require('./components/input/LocalInput');
var LocalPlayerScript = require('./components/script/LocalPlayerScript');


var Game = module.exports = function (settings) {
  var self = this;

  // Set up factories for easy access from components
  self.factories = {
    player: require('./factories/playerFactory').bind(self),
    weapon: require('./factories/weaponFactory').bind(self)
  };

  // Map

  self.canvas = canvas;
  self.loop = new Loop(self.canvas, self.ctx);

  self.map = new Map(settings.map(self.canvas));
  self.add(self.map);

  // Player one

  self.playerOne = self.factories.player({
      input: new LocalInput(),
      x: self.canvas.width/2,
      y: self.canvas.height/2,
      weapon: self.factories.weapon('AutoLaserCannon', {
        game: self,
        map: self.map
      }),
      script: new LocalPlayerScript()
    }, {
      map: self.map
    });

  self.cursor = new Cursor();
  self.add(self.cursor);

  // Network

  self.network = new Network(self);
  self.network.setLocalPlayer(self.playerOne);
  self.add(self.network);

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
