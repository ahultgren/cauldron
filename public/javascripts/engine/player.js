'use strict';

var util = require('util');
var Entity = require('./components/entity');


var Player = module.exports = function Player (settings) {
  this.constructor.super_.call(this, {}, settings);

  this.input.on('mousedown', this.triggerStart.bind(this), false);
  this.input.on('mouseup', this.triggerEnd.bind(this), false);
};

util.inherits(Player, Entity);


Player.prototype.triggerStart = function(settings) {
  var from, toward, spread;

  if(this.weapon) {
    from = settings.from || this;
    toward = settings.toward || this.input.mouse;
    spread = settings.spread || this.weapon.spread;

    this.weapon.triggerStart(from, toward, spread);

    this.emit('action', 'triggerStart', {
      from: {
        x: from.x,
        y: from.y
      },
      toward: {
        x: toward.x,
        y: toward.y
      },
      spread: spread
    });
  }
};


Player.prototype.triggerEnd = function() {
  if(this.weapon) {
    this.weapon.triggerEnd();

    this.emit('action', 'triggerEnd');
  }
};
