'use strict';

var cauldron = require('cauldron-core');
var Socket = require('./socket');
var leaderboard = require('./leaderboard');

var Multiplayer = require('./systems/multiplayer');
var Hud = require('./systems/hud');
var Sound = require('./systems/sound');
var hud = require('./components/hud');

var {
  Render, KeyboardInput, Movement, MouseInput, PointerFollower, Parent, Factory,
  Collision, Animation, Expire, Camera
} = cauldron.systems;

var {
  position, appearance, keyboardControlled, mouseControlled, pointerFollower,
  parent, factory, cameraTarget,
} = cauldron.components;

var Game = cauldron.Game;
var Entity = cauldron.Entity;

var gameCanvas = document.querySelector('.js-game-canvas');
var hudCanvas = document.querySelector('.js-hud-canvas');

gameCanvas.addEventListener('contextmenu', e => e.preventDefault(), false);
hudCanvas.addEventListener('contextmenu', e => e.preventDefault(), false);

var joinMultiplayerGame = () => {
  // [TODO] Use a config file
  var socket = Socket.create('ws://localhost:5005');

  socket.on('game/joined', ({player: playerData, rules}) => {
    var camera = Camera.create(gameCanvas);
    var game = Game.create();
    game.rules = rules;

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
    game.addSystem(Sound.create());
    game.addRenderSystem(Render.create(gameCanvas, camera));
    game.addRenderSystem(Hud.create(hudCanvas, camera));

    var player = Entity.fromData(playerData);
    player.addComponent(keyboardControlled());
    player.addComponent(mouseControlled());
    player.addComponent(cameraTarget());
    player.addComponent(hud({
      type: ['health', 'score', 'powerup'],
    }));
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
        damage: 2,
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

    socket.on('game/end', data => leaderboard.show(game, data, joinMultiplayerGame));

    window.game = game;
  });
};

joinMultiplayerGame();
