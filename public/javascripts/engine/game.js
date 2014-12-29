'use strict';

/*jshint -W079 */

var canvas = require('./system/canvas');
var Network = require('./system/network');
var mouse = require('./system/mouse');
var Loop = require('./loop');
var Camera = require('./Camera');
var CollisionManager = require('./CollisionManager');
var LocalInput = require('./components/input/LocalInput');
var MockInput = require('./components/input/MockInput');
var LocalPlayerScript = require('./components/script/LocalPlayerScript');
var PlayerOutput = require('./components/output/PlayerOutput');
var LocalPlayerPowerups = require('./components/powerups/LocalPlayerPowerups');
var Entity = require('./components/entity');
var EntityV2 = require('./components/entity.v2');
var CursorGraphics = require('./components/graphics/CursorGraphics');
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

  self.map = new EntityV2({
    paths: settings.map()
  });
  self.map.addStage2Component(MapGraphics.create());
  self.map.init();

  self.add(self.map);

  self.collisionManager = new CollisionManager({
    paths: self.map.data.paths
  });

  // Network

  self.network = new Network(self);
  self.add(self.network);

  // Player

  self.playerOne = self.factories.player({
    input: new LocalInput(),
    weapon: self.factories.weapon('LaserCannon'),
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

  //## Mock-player for something to shoot at
  self.playerTwo = self.factories.player({
    input: new MockInput(),
    weapon: self.factories.weapon('LaserCannon'),
    script: new LocalPlayerScript(),
    powerups: new LocalPlayerPowerups({
      game: self
    })
  }, {
    x: 60,
    y: 100
  });

  // Cursor

  var cursor = EntityV2.create({
    fill: self.playerOne.data.fill,
    mouse: mouse //## Use an input instance instead?
  })
  .addStage2Component(CursorGraphics.create())
  .init();

  self.add(cursor);

  self.add(self.factories.powerup({}, {
    powerupType: 'weapon',
    powerupData: 'PlasmaRifle'
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

  self.camera = new Camera({
    player: self.playerOne,
    canvas: self.canvas,
    map: self.map,
    corrected: [mouse]
  });

  self.add(self.camera);
  self.add(mouse);
};


Game.prototype.add = function (entity) {
  if(entity.graphics && entity.graphics.type_ && this.loop[entity.graphics.type_]) {
    this.loop[entity.graphics.type_].push(entity);
  }

  // v2 graphics
  if(entity.data && entity.data.gco_ && this.loop[entity.data.gco_]) {
    this.loop[entity.data.gco_].push(entity);
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
