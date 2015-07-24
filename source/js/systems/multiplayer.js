'use strict';

var Entity = require('cauldron-core/app/entity');
var socketComponent = require('../components/socketControlled');
var find = require('cauldron-core/app/utils/findMap');

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
    this.beat = true;
    this.respawns = null;

    this.socket.on('player/left', data => this.peerLeft(data));
    this.socket.on('game/updates', updates => this.updates.push(...updates));
    this.socket.on('game/respawn', data => this.respawns = data);
    this.socket.on('close', () => this.game.stop());
  }

  tick (entities) {
    this.beat = !this.beat;
    this.readUpdates();
    this.readRespawns(entities);
    this.sendUpdates(entities);
    this.sendSpawns(entities);
  }

  readUpdates () {
    this.updates.forEach((data) => {
      var player = this.game.getEntity(data.id);

      // [TODO] Do not add local player as peer
      if(!player) {
        player = Entity.fromData(data);
        player.addComponent(socketComponent({
          player_id: data.id,
        }));
        this.game.addEntity(player);
      }
      else {
        if(player.hasComponent('keyboardControlled')) {
          // [TODO] Interpolate? For now just ignore position stuff
          delete data.components.position;
          delete data.components.physics;
        }

        setPlayerData(player, data.components);
      }
    });
    this.updates = [];
  }

  readRespawns (entities) {
    if(!this.respawns) {
      return;
    }

    var {x, y} = this.respawns;
    var localPlayer = find(isLocalPlayer, entities);
    var position = localPlayer.getComponent('position');
    position.x = x;
    position.y = y;
    this.respawns = null;
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
    this.game.removeEntity(player_id);
    console.log(`${player_id} disconnected`);
  }
}

module.exports = Multiplayer;
