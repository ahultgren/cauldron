'use strict';

var Peer = require('./input/PeerInput');
var Peerjs = require('peerjs');


var Network = module.exports = function (game) {
  //## [TODO] shim peerjs
  var self = this;

  this.game = game;

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

    //## does this work?
    self.peers[id].send(JSON.stringify({
      position: {
        x: self.localPlayer.x,
        y: self.localPlayer.y,
        a: self.localPlayer.a
      }
    }));
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

  player.on('update_position', function (position) {
    self.sendToAll({
      position: position
    });
  });

  player.on('action', function (action, data) {
    self.sendToAll({
      action: action,
      data: data
    });
  });
};


Network.prototype.removeLocalPlayer = function() {
  //this.localPlayer.removeEventlistener
};
