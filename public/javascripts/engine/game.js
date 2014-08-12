'use strict';

/*jshint -W079 */

var canvas = require('./canvas');
var Loop = require('./loop');
var CollisionManager = require('./CollisionManager');
var Network = require('./system/network');
var LocalInput = require('./components/input/LocalInput');
var LocalPlayerScript = require('./components/script/LocalPlayerScript');
var PlayerOutput = require('./components/output/PlayerOutput');
var LocalPlayerPowerups = require('./components/powerups/LocalPlayerPowerups');
var Entity = require('./components/entity');
var CursorGraphics = require('./components/graphics/CursorGraphics');
var mouse = require('./system/mouse');
var FOWGraphics = require('./components/graphics/FOWGraphics');
var FOVGraphics = require('./components/graphics/FOVGraphics');
var MapGraphics = require('./components/graphics/MapGraphics');


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

  self.map = new Entity({}, {
    graphics: new MapGraphics()
  }, {
    paths: settings.map()
  });

  self.add(self.map);

  self.collisionManager = new CollisionManager({
    paths: self.map.data.paths
  });

  // Network

  self.network = new Network(self);
  self.add(self.network);

  // Player one

  self.playerOne = self.factories.player({
    input: new LocalInput(),
    weapon: self.factories.weapon('PlasmaRifle'),
    script: new LocalPlayerScript(),
    output: new PlayerOutput({
      network: self.network
    }),
    powerups: new LocalPlayerPowerups({
      game: self
    })
  }, {
    x: 20,
    y: 20
  });

  self.add(new Entity({}, {
    graphics: new CursorGraphics({
      mouse: mouse //## Use an input instance instead?
    })
  }, {
    fill: '#ccc'
  }));

  self.add(self.factories.powerup({}, {
    powerupType: 'weapon',
    powerupData: 'AutoLaserCannon'
  }));

  // Visibility polygon

  self.add(new Entity({
    graphics: new FOWGraphics({
      paths: self.map.data.paths,
      player: self.playerOne
    })
  }));

  self.add(new Entity({
    graphics: new FOVGraphics({
      paths: self.map.data.paths,
      player: self.playerOne
    })
  }));
};


Game.prototype.add = function (entity) {
  if(entity.graphics && entity.graphics.type_ && this.loop[entity.graphics.type_]) {
    this.loop[entity.graphics.type_].push(entity);
  }

  if(entity.collision && entity.collision.type_ && this.loop[entity.collision.type_]) {
    this.loop[entity.collision.type_].push(entity);
  }

  if(entity.update) {
    this.loop.updating.push(entity);
  }

  if(entity.updateEvent) {
    this.loop.eventUpdating.push(entity);
  }

  return this;
};


Game.prototype.start = function() {
  this.loop.start();
};
