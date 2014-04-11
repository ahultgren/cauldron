'use strict';

var Peer = require('./peer');


var Network = module.exports = function (game) {
  //## [TODO] shim peerjs
  var self = this;
  var peer = new window.Peer({
    key: 'ambtcaqn9kl3ow29'
  });

  // Store peers
  self.peers = [];

  peer.on('open', function (id) {
    console.log('Connected as ' + id);
    self.id = id;
  });

  peer.on('connection', function (conn) {
    console.log('PEER connected ' + conn.peer);

    conn.on('open', function () {
      console.log('PEER connection open ' + conn.peer);

      self.peers[conn.peer] = new Peer(conn, game);
    });

    conn.on('error', function (err) {
      console.log('peer connection error!');
      console.log(err);
      delete self.peers[conn.peer];
    });
  });


  //## Hack to support connecting until we have a socket implementation
  window.connect = function (id) {
    var conn = peer.connect(id);

    console.log('connecting...');

    conn.on('open', function () {
      console.log('PEER connection open ' + id);

      self.peers[id] = new Peer(conn, game);
    });

    conn.on('error', function (err) {
      console.log('peer connection error!');
      console.log(err);
      delete self.peers[id];
    });
  };
};

Network.prototype.sendToAll = function(data) {
  var i, l,
      peers = Object.keys(this.peers),
      peer;

  for(i = 0, l = peers.length; i < l; i++) {
    peer = this.peers[peers[i]];

    if(peer.conn.open) {
      peer.send(JSON.stringify({
        id: this.id,
        data: data
      }));
    }
  }
};
