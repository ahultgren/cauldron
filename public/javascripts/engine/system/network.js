'use strict';

var util = require('util');
var utils = require('../utils');
var EventEmitter = require('events').EventEmitter;
var Peerjs = require('peerjs');
var Peer = require('./Peer');


var Network = module.exports = function (game) {
  this.constructor.super_.call(this);

  var self = this;

  this.game = game;
  this.outgoing = [];

  self.localPeer = new Peerjs({
    host: window.location.hostname,
    port: window.location.port,
    config: {
      'iceServers': [
        { url: 'stun:stun.l.google.com:19302' },
        { url: 'stun:stun1.l.google.com:19302' },
        { url: 'stun:stun2.l.google.com:19302' },
        { url: 'stun:stun3.l.google.com:19302' },
        { url: 'stun:stun4.l.google.com:19302' }
      ]
    }
  });

  // Store connections
  self.connections = [];

  self.localPeer.on('open', function (id) {
    console.log('Connected as ' + id);
    self.id = id;
    self.emit('ready');
  });

  self.localPeer.on('connection', function (conn) {
    console.log('PEER connection attempt ' + conn.peer);
    self.connection(conn.id, conn);
  });

  self.localPeer.on('error', function (err) {
    console.log('network error', err);
  });

  //## Hack to support connecting until we have a socket implementation
  window.connect = this.connect.bind(this);
};

util.inherits(Network, EventEmitter);


Network.prototype.connect = function(id) {
  console.log('connecting to', id);
  this.connection(id, this.localPeer.connect(id));
};

Network.prototype.connection = function(id, conn) {
  var self = this;

  conn.on('open', function () {
    console.log('PEER connection open ' + id);

    self.createPeer(id, conn);
    self.emit('newPeer', id);
  });

  conn.on('error', function (err) {
    console.log('peer connection error!', err);

    self.emit('peerError', id);
    self.removePeer(id);
  });

  conn.on('close', function () {
    console.log(id + 'disconnected');
    self.removePeer(id);
  });
};

Network.prototype.createPeer = function(id, conn) {
  this.connections[id] = new Peer(this.game, id, conn);
};

Network.prototype.removePeer = function(id) {
  this.connections[id].remove();
  delete this.connections[id];
};

Network.prototype.disconnect = function() {
  this.localPeer.destroy();
};

Network.prototype.sendTo = function(id, data) {
  if(this.connections[id].conn.open) {
    this.connections[id].conn.send(data);
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

Network.prototype.connectToAllPeers = function() {
  var self = this;

  utils.ajax('GET', '/peerjs/peers', function (err, result) {
    var data = JSON.parse(result);

    data.forEach(function (peerId) {
      if(peerId !== self.localPeer.id) {
        self.connect(peerId);
      }
    });
  });
};

Network.prototype.updateEvent = function() {
  // Only send if there's anything to send
  if(this.outgoing.length) {
    this.sendToAll(this.outgoing);
  }

  // Clear outgoing queue
  this.outgoing = [];
};
