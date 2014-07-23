'use strict';

var Peer = require('./components/input/PeerInput');
var Peerjs = require('peerjs');


var Network = module.exports = function (game) {
  var self = this;

  this.game = game;
  this.outgoing = [];

  self.localPeer = new Peerjs({
    host: window.location.hostname,
    port: 9000,
    path: 'peers'
  });

  // Store peers
  self.peers = [];

  self.localPeer.on('open', function (id) {
    console.log('Connected as ' + id);
    self.id = id;
  });

  self.localPeer.on('connection', function (conn) {
    console.log('PEER connection attempt ' + conn.peer);
    self.connection(conn.id, conn);
  });


  //## Hack to support connecting until we have a socket implementation
  window.connect = this.connect.bind(this);
};


Network.prototype.connect = function(id) {
  console.log('connecting...');
  this.connection(id, this.localPeer.connect(id));
};


Network.prototype.connection = function(id, conn) {
  var self = this;

  conn.on('open', function () {
    console.log('PEER connection open ' + id);
    self.peers[id] = new Peer({
      conn: conn,
      game: self.game
    });

    self.peers[id].send(JSON.stringify([
      {
        type: 'spawnPlayer',
        data: {
          fill: self.localPlayer.fill //## Just testing with something
        }
      },
      {
        type: 'weapon',
        data: {
          weapon: self.localPlayer.weapon.name
        }
      },
      {
        type: 'position',
        data: {
          x: self.localPlayer.x,
          y: self.localPlayer.y,
          a: self.localPlayer.a
        }
      }
    ]));
  });

  conn.on('error', function (err) {
    console.log('peer connection error!');
    console.log(err);
    delete self.peers[id];
  });
};


Network.prototype.sendToAll = function(data) {
  var i, l,
      peers = Object.keys(this.peers),
      peer;

  try {
    data = JSON.stringify(data);
  }
  catch (e) {
    console.error(data);
    throw e;
  }

  for(i = 0, l = peers.length; i < l; i++) {
    peer = this.peers[peers[i]];

    if(peer.conn.open) {
      peer.send(data);
    }
  }
};


Network.prototype.setLocalPlayer = function(player) {
  var self = this;

  if(self.localPlayer) {
    this.removeLocalPlayer();
  }

  self.localPlayer = player;

  player.on('update', function () {
    var position = {
      x: player.x,
      y: player.y,
      a: player.a
    };

    self.outgoing.push({
      type: 'position',
      data: position
    });
  });

  player.on('action', function (action, data) {
    self.outgoing.push({
      type: action,
      data: data
    });
  });
};


Network.prototype.removeLocalPlayer = function() {
  //this.localPlayer.removeEventlistener
};

Network.prototype.update = function() {
  var outgoing = this.outgoing;

  // Clear outgoing queue
  this.outgoing = [];

  // Only send if there's anything to send
  if(outgoing.length) {
    this.sendToAll(outgoing);
  }
};
