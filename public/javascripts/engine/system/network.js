'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var Peerjs = require('peerjs');
var PeerInput = require('../components/input/PeerInput');
var PeerPlayerScript = require('../components/script/PeerPlayerScript');


var Network = module.exports = function (game) {
  this.constructor.super_.call(this);

  var self = this;

  this.game = game;
  this.outgoing = [];

  self.localPeer = new Peerjs({
    host: window.location.hostname,
    port: 9000,
    path: 'peers'
  });

  // Store connections
  self.connections = [];

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

util.inherits(Network, EventEmitter);


Network.prototype.connect = function(id) {
  console.log('connecting...');
  this.connection(id, this.localPeer.connect(id));
};


Network.prototype.connection = function(id, conn) {
  var self = this;

  conn.on('open', function () {
    console.log('PEER connection open ' + id);
    self.connections[id] = conn;

    self.game.factories.player({
      input: new PeerInput({
        conn: conn,
        game: self.game
      }),
      script: new PeerPlayerScript()
    });

    self.emit('newPeer', id);
  });

  conn.on('error', function (err) {
    console.log('peer connection error!');
    console.log(err);
    delete self.connections[id];
    self.emit('peerError', id);
  });
};


Network.prototype.sendTo = function(id, data) {
  if(this.connections[id].open) {
    this.connections[id].send(data);
  }
};


Network.prototype.sendToAll = function(data) {
  var i, l;
  var connections = Object.keys(this.connections);

  try {
    data = JSON.stringify(data);
  }
  catch (e) {
    console.error(data);
    throw e;
  }

  for(i = 0, l = connections.length; i < l; i++) {
    this.sendTo(connections[i], data);
  }
};


Network.prototype.updateEvent = function() {
  var outgoing = this.outgoing;

  // Clear outgoing queue
  this.outgoing = [];

  // Only send if there's anything to send
  if(outgoing.length) {
    this.sendToAll(outgoing);
  }
};