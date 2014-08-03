'use strict';

/*jshint -W079 */

var canvas = require('./canvas');
var Loop = require('./loop');
var Map = require('./map');
var CollisionManager = require('./CollisionManager');
var VisibilityPolygon = require('./visibility-polygon');
var CVP = require('./conical-visibility-polygon');
var Network = require('./system/network');
var LocalInput = require('./components/input/LocalInput');
var LocalPlayerScript = require('./components/script/LocalPlayerScript');
var PlayerOutput = require('./components/output/PlayerOutput');
var Entity = require('./components/entity');
var CursorGraphics = require('./components/graphics/CursorGraphics');
var mouse = require('./system/mouse');


var Game = module.exports = function (settings) {
  var self = this;

  // Set up factories for easy access from components
  self.factories = {
    player: require('./factories/playerFactory').bind(self),
    weapon: require('./factories/weaponFactory').bind(self),
    ammunition: require('./factories/ammunitionFactory').bind(self),
    powerup: require('./factories/powerupFactory').bind(self)
  };

  // Map

  self.canvas = canvas;
  self.loop = new Loop(self);

  self.map = new Map(settings.map(self.canvas));
  self.add(self.map);

  self.collisionManager = new CollisionManager({
    segments: self.map.segments
  });

  // Network

  self.network = new Network(self);
  self.add(self.network);

  // Player one

  self.playerOne = self.factories.player({
      input: new LocalInput(),
      x: self.canvas.width/2,
      y: self.canvas.height/2,
      weapon: self.factories.weapon('PlasmaRifle'),
      script: new LocalPlayerScript(),
      output: new PlayerOutput({
        network: self.network
      })
    });

  self.add(new Entity({
    type_: 'alwaysVisible',
    fill: '#ccc',
    graphics: new CursorGraphics({
      mouse: mouse //## Use an input instance instead?
    }),
  }));

  self.add(self.factories.powerup());

  // Visibility polygon

  self.visibilityPolygon = new VisibilityPolygon(self.map.segments, self.playerOne);
  self.add(self.visibilityPolygon);

  self.visibilityPolygon = new CVP(self.map.segments, self.playerOne);
  self.add(self.visibilityPolygon);
};


Game.prototype.add = function (entity) {
  if(entity.type_ && this.loop[entity.type_]) {
    this.loop[entity.type_].push(entity);
  }

  if(entity.update) {
    this.loop.updating.push(entity);
  }
  else if(entity.isObstacle_) {
    this.loop.obstacles.push(entity);
  }

  if(entity.collision) {
    this.loop.collidable.push(entity);
  }

  if(entity.updateEvent) {
    this.loop.eventUpdating.push(entity);
  }

  return this;
};


Game.prototype.start = function() {
  this.loop.start();
};
