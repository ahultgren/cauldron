'use strict';

var util = require('util');
var InputInterface = require('./InputInterface');
var Player = require('../../Player');
var Physics = require('../physics');
var Graphics = require('../graphics');
var defaults = {
  from: {},
  toward: {},
  keyStates: {
    left: false,
    right: false,
    up: false,
    down: false
  }
};

var Peer = module.exports = function (settings) {
  // conn, game
  this.constructor.super_.call(this, defaults, settings);

  this.conn.on('data', this.onData.bind(this));
};

util.inherits(Peer, InputInterface);


Peer.prototype.send = function(data) {
  this.conn.send(data);
};

Peer.prototype.onData = function(data) {
  data = JSON.parse(data);

  if(data.position) {
    if(!this.player) {
      this.player = new Player({
        input: this,
        physics: new Physics({
          map: this.game.map
        }),
        graphics: new Graphics(),
        x: data.position.x,
        y: data.position.y,
        a: data.position.a
      });

      this.game.add(this.player);

      //## Temp to test with a weapon (it must be sent on connect somehow)
      this.player.weapon = new (require('../../weapons/auto-laser-cannon'))({
        map: this.game.map,
        game: this.game
      });
    }

    this.player.control(data.position);
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

Peer.prototype.isDown = function (key) {
  return this.keyStates[key];
};

Peer.prototype.update = function(entity) {
  //## States are not used yet, but when they are it's really only for position
  // prediction/interpolation
  entity.dx += this.isDown('left') && -entity.acc || this.isDown('right') && entity.acc || 0;
  entity.dy += this.isDown('up') && -entity.acc || this.isDown('down') && entity.acc || 0;
};
