'use strict';

var Player = require('./Player');
var Stdin = require('./input/stdin');


var Peer = module.exports = function (conn, game) {
  this.conn = conn;
  this.game = game;
  this.from = {};
  this.toward = {};

  conn.on('data', this.data.bind(this));
};

Peer.prototype.send = function(data) {
  this.conn.send(data);
};

Peer.prototype.data = function(data) {
  data = JSON.parse(data);

  if(data.position) {
    if(!this.player) {
      this.input = new Stdin({
        mouse: {},
        keyboard: {}
      });

      this.player = new Player({
        map: this.game.map,
        x: data.position.x,
        y: data.position.y,
        a: data.position.a,
        input: this.input
      });

      this.game.add(this.player);

      //## Temp to test with a weapon (it must be sent on connect somehow)
      this.player.weapon = new (require('./weapons/auto-laser-cannon'))({
        map: this.game.map,
        game: this.game
      });
    }

    this.player.update(data.position);
  }

  if(data.weapon) {
    this.player.weapon = new (require('./weapons/' + data.weapon))({
      game: this.game,
      map: this.game.map.segments
    });
  }

  if(data.action) {
    //## For now just supports shoot i think
    this.player[data.action](data.data);
  }
};
