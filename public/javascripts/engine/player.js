'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var utils = require('./utils');

var defaults = {
  _type: 'masked',
  radius: 5,
  a: 0,
  dx: 0,
  dy: 0,
  acc: 0.8,
  friction: 0.8,
  fill: '#'+Math.floor(Math.random()*4095).toString(16)
};


var Player = module.exports = function Player (settings) {
  utils.extend(this, defaults, settings);

  this.input.on('mousedown', this.triggerStart.bind(this), false);
  this.input.on('mouseup', this.triggerEnd.bind(this), false);
};

util.inherits(Player, EventEmitter);


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


Player.prototype.control = function(settings) {
  utils.extend(this, settings);
};


Player.prototype.update = function() {
  this.input.update(this);
  this.physics.update(this);

  this.emit('update');
};


Player.prototype.draw = function(ctx) {
  this.graphics.draw(this, ctx);
};
