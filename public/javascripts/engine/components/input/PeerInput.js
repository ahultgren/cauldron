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
  var self = this;

  data = JSON.parse(data);

  if(!Array.isArray(data)) {
    self.dispatch(data);
  }
  else {
    data.forEach(self.dispatch.bind(this));
  }
};

Peer.prototype.dispatch = function(message) {
  var handler = 'on' + capitalize(message.type);

  if(this[handler]) {
    this[handler](message.data);
  }
  else {
    console.log('Unhandled network message', message.type, message.data);
  }
};

Peer.prototype.onPosition = function(data) {
  if(!this.player) {
    this.player = new Player({
      input: this,
      physics: new Physics({
        map: this.game.map
      }),
      graphics: new Graphics(),
      x: data.x,
      y: data.y,
      a: data.a
    });

    this.game.add(this.player);

    //## Temp to test with a weapon (it must be sent on connect somehow)
    this.player.weapon = new (require('../../weapons/auto-laser-cannon'))({
      map: this.game.map,
      game: this.game
    });
  }

  //## This shall become this.newPosition = data; and be used in update()
  window.mjau = data;
  this.player.control(data);
};

Peer.prototype.onWeapon = function(data) {
  this.player.weapon = new (require('./weapons/' + data.weapon))({
    game: this.game,
    map: this.game.map.segments
  });
};

Peer.prototype.onTriggerStart = function(data) {
  this.player.triggerStart(data);
};

Peer.prototype.onTriggerEnd = function(data) {
  this.player.triggerEnd(data);
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


/* Helpers
============================================================================= */
function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
