'use strict';

var Player = require('./Player');


var Peer = module.exports = function (conn, game) {
  this.conn = conn;
  this.game = game;

  conn.on('data', this.data.bind(this));
};

Peer.prototype.send = function(data) {
  this.conn.send(data);
};

Peer.prototype.data = function(data) {
  data = JSON.parse(data);

  if(!this.player) {
    this.player = new Player({
      x: data.data.player.x,
      y: data.data.player.y
    });

    this.game.loop.masked.push(this.player);
  }

  this.player.update(data.data.player);
};
