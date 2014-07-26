'use strict';

var util = require('util');
var utils = require('../../utils');
var Component = require('../Component');
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

var Peer = module.exports = function PeerInput (settings) {
  // conn, game
  this.constructor.super_.call(this, defaults, settings);

  this.conn.on('data', this.onData.bind(this));
};

util.inherits(Peer, Component);


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

Peer.prototype.updateEvent = function(entity) {
  //## States are not used yet, but when they are it's really only for position
  // prediction/interpolation
  entity.dx += this.isDown('left') && -entity.acc || this.isDown('right') && entity.acc || 0;
  entity.dy += this.isDown('up') && -entity.acc || this.isDown('down') && entity.acc || 0;

  if(this.newPosition) {
    utils.extend(entity, this.newPosition);
    this.newPosition = null;
  }

  if(this.newWeapon) {
    entity.weapon = this.game.factories.weapon(this.newWeapon.weapon, {
      game: this.game,
      map: this.game.map
    });
    this.newWeapon = null;
  }
};


/* Data handlers
============================================================================= */

Peer.prototype.onWeapon = function(data) {
  this.newWeapon = data;
};

Peer.prototype.onPosition = function(data) {
  if(this.newPosition) {
    // Merge data, the might not contain the same properties, but the latest
    // update of the same property shall conquer
    utils.extend(this.newPosition, data);
  }
  else {
    this.newPosition = data;
  }
};

Peer.prototype.onTriggerStart = function(data) {
  this.emit('triggerStart', data);
};

Peer.prototype.onTriggerEnd = function(data) {
  this.emit('triggerEnd', data);
};


/* Helpers
============================================================================= */
function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
