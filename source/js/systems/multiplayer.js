'use strict';

var Entity = require('cauldron-core/app/entity');
var playerFactory = require('cauldron-core/app/factories/player');
var socketComponent = require('../components/socketControlled');

var pickLocalPlayerData = (player) => {
  return {
    position: player.getComponent('position'),
    appearance: player.getComponent('appearance'),
    physics: player.getComponent('physics'),
    collision: player.getComponent('collision'),
  };
};

var setPlayerData = (player, data) => {
  Object.keys(data).forEach((name) => {
    var component = player.getComponent(name);
    var componentData = data[name];

    if(component) {
      Object.keys(componentData).forEach((key) => {
        component[key] = componentData[key];
      });
    }
  });
};

// [TODO] Better way than assuming keyboardControlled is only player?
var isLocalPlayer = (entity) => entity.hasComponent('keyboardControlled');

class Multiplayer {
  static create (socket) {
    return new Multiplayer(socket);
  }

  constructor (socket) {
    this.socket = socket;
    this.updates = [];
    this.spawns = [];
    this.peers = new Map();
    this.beat = true;

    this.socket.on('player/left', data => this.peerLeft(data));
    this.socket.on('player/update', data => this.updates.push(data));
    this.socket.on('game/spawn', data => this.spawns.push(data));
  }

  tick (entities) {
    this.beat = !this.beat;
    this.readUpdates();
    this.readSpawns();
    this.sendUpdates(entities);
    this.sendSpawns(entities);
  }

  readUpdates () {
    this.updates.forEach((data) => {
      var player = this.peers.get(data.player_id);

      if(!player) {
        player = playerFactory(data);
        player.addComponent(socketComponent({
          player_id: data.player_id,
        }));
        this.game.addEntity(player);
        this.peers.set(data.player_id, player);
      }
      else {
        setPlayerData(player, data);
      }
    });
    this.updates = [];
  }

  readSpawns () {
    this.spawns.forEach((data) => {
      this.game.addEntity(Entity.fromData(data));
    });
    this.spawns = [];
  }

  sendUpdates (entities) {
    var localPlayer, data;

    // No need to send data every tick
    if(!this.beat) {
      return;
    }

    entities.forEach((entity) => {
      if(isLocalPlayer(entity)) {
        localPlayer = entity;
      }
    });

    if(!localPlayer) {
      return;
    }

    // [TODO] Only send data if anything's changed
    data = pickLocalPlayerData(localPlayer);

    this.socket.send('player/update', data);
  }

  sendSpawns () {
    this.mediator.triggered('spawn').forEach(({spawn, spawner}) => {
      // [TODO] handle this on the server?
      if(!spawner.getComponent('parent')
        || !isLocalPlayer(this.game.getEntity(spawner.getComponent('parent').parentId))) {
        return;
      }
      this.socket.send('player/spawn', spawn.serialize());
    });

  }

  peerLeft ({player_id}) {
    var entity = this.peers.get(player_id);
    this.peers.delete(player_id);
    this.game.removeEntity(entity.id);
    console.log(`${player_id} disconnected`);
  }
}

module.exports = Multiplayer;
