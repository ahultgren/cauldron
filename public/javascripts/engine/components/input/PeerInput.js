'use strict';

var util = require('util');
var utils = require('../../utils');
var InputInterface = require('./InputInterface');
var Player = require('../../Player');
var Physics = require('../physics');
var Graphics = require('../graphics');
var Weapon = require('../../weapons');
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
  var i, l;

  data = JSON.parse(data);

  if(!Array.isArray(data)) {
    this.dispatch(data);
  }
  else {
    for(i = 0, l = data.length; i < l; i++) {
      this.dispatch(data[i]);
    }
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

Peer.prototype.isDown = function (key) {
  return this.keyStates[key];
};

Peer.prototype.update = function(entity) {
  //## States are not used yet, but when they are it's really only for position
  // prediction/interpolation
  entity.dx += this.isDown('left') && -entity.acc || this.isDown('right') && entity.acc || 0;
  entity.dy += this.isDown('up') && -entity.acc || this.isDown('down') && entity.acc || 0;

  if(this.newPosition) {
    utils.extend(entity, this.newPosition);
    this.newPosition = null;
  }
};


/* Data handlers
============================================================================= */

Peer.prototype.onSpawnPlayer = function(data) {
  data = utils.extend({
    x: 0,
    y: 0,
    a: 0
  },
  data,
  {
    input: this,
    physics: new Physics({
      map: this.game.map
    }),
    graphics: new Graphics()
  });

  this.player = new Player(data);

  this.game.add(this.player);
};

Peer.prototype.onWeapon = function(data) {
  this.player.weapon = new Weapon(data.weapon, {
    map: this.game.map,
    game: this.game
  });
};

Peer.prototype.onPosition = function(data) {
  this.newPosition = data;
};

Peer.prototype.onTriggerStart = function(data) {
  this.player.triggerStart(data);
};

Peer.prototype.onTriggerEnd = function(data) {
  this.player.triggerEnd(data);
};


/* Helpers
============================================================================= */
function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
