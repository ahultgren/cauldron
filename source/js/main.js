'use strict';

var Game = require('./game');
var Socket = require('./socket');
var maps = require('./maps');

var Render = require('./systems/render');
var KeyboardInput = require('./systems/keyboardInput');
var Movement = require('./systems/movement');
var MouseInput = require('./systems/mouseInput');
var PointerFollower = require('./systems/pointerFollower');
var Parent = require('./systems/parent');
var Factory = require('./systems/factory');
var Collision = require('./systems/collision');
var Animation = require('./systems/animation');
var Expire = require('./systems/expire');
var Multiplayer = require('./systems/multiplayer');
var Camera = require('./systems/camera');

var position = require('./components/position');
var appearance = require('./components/appearance');
var keyboardControlled = require('./components/keyboardControlled');
var mouseControlled = require('./components/mouseControlled');
var pointerFollower = require('./components/pointerFollower');
var parent = require('./components/parent');
var factory = require('./components/factory');
var collision = require('./components/collision');
var cameraTarget = require('./components/cameraTarget');
var cameraBounds = require('./components/cameraBounds');

var playerFactory = require('./factories/player');

var Entity = require('./entity');

// [TODO] Use a config file
var socket = Socket.create('ws://localhost:5005');

socket.on('game/joined', (rules) => {
  var canvas = document.querySelector('.js-canvas');
  var camera = Camera.create(canvas);
  var game = Game.create();
  game.addSystem(KeyboardInput.create());
  game.addSystem(MouseInput.create(camera)); // [TODO] Bad dependency
  game.addSystem(Collision.create());
  game.addSystem(Movement.create());
  game.addSystem(camera);
  game.addSystem(PointerFollower.create(camera));
  game.addSystem(Parent.create());
  game.addSystem(Factory.create());
  game.addSystem(Expire.create());
  game.addSystem(Multiplayer.create(socket));
  game.addSystem(Animation.create());
  game.addRenderSystem(Render.create(canvas, camera));

  var map = Entity.create();
  var mapPaths = maps[rules.map];
  map.addComponent(position());
  map.addComponent(cameraBounds.fromPaths(mapPaths));
  map.addComponent(appearance({
    shape: 'polygons',
    fill: 'transparent',
    stroke: '#f00',
    paths: mapPaths,
  }));
  map.addComponent(collision.fromPaths({
    paths: mapPaths,
  }));
  game.addEntity(map);
  game.setMap(map);

  var player = playerFactory();
  player.addComponent(keyboardControlled());
  player.addComponent(mouseControlled());
  player.addComponent(cameraTarget());
  game.addEntity(player);

  var shield = Entity.create();
  shield.addComponent(parent({
    parentId: player.id,
  }));
  shield.addComponent(position({
    offsetX: 170,
    offsetY: 0,
  }));
  shield.addComponent(appearance({
    fill: 'transparent',
    stroke: '#f00',
    shape: 'arc',
    radius: 200,
    gap: Math.PI * 0.95,
  }));
  game.addEntity(shield);

  var weapon = Entity.create();
  weapon.addComponent(position());
  weapon.addComponent(parent({
    parentId: player.id,
  }));
  weapon.addComponent(factory({
    factory: 'bullet',
    event: 'click',
    data: {
      speed: 20,
    }
  }));
  game.addEntity(weapon);

  var pointer = Entity.create();
  pointer.addComponent(position({x: 0, y: 0}));
  pointer.addComponent(pointerFollower());
  pointer.addComponent(appearance({
    fill: 'transparent',
    stroke: '#fd0',
    shape: 'arc',
    radius: 10,
    gap: 0,
  }));
  game.addEntity(pointer);

  var pointerPoint = Entity.create();
  pointerPoint.addComponent(parent({
    parentId: pointer.id,
  }));
  pointerPoint.addComponent(position({
    offsetX: 0,
    offsetY: 0,
  }));
  pointerPoint.addComponent(appearance({
    fill: '#fd0',
    stroke: 'transparent',
    shape: 'arc',
    radius: 2,
  }));
  game.addEntity(pointerPoint);

  game.start();

  window.game = game;
});
