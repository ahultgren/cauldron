'use strict';

//## This doesn't feel right. Will anything else than a player use output?

var util = require('util');
var Component = require('../Component');


var Output = module.exports = function PlayerOutput (settings) {
  this.constructor.super_.call(this, {
    newPeers: []
  }, settings);
  // this.network

  this.network.on('newPeer', this.newPeer_.bind(this));
};

util.inherits(Output, Component);


Output.prototype.init = function(entity) {
  var self = this;

  //## Can this be made more specific? Most importantly not listen on entity (so that entity is not an eventemitter)?
  entity.weapon.on('action', function (action, data) {
    self.network.outgoing.push({
      type: action + 'Weapon',
      data: data
    });
  });
};

Output.prototype.updateEvent = function(entity) {
  var self = this;

  //## Check if update is needed; Object.observe?
  self.network.outgoing.push({
    type: 'position',
    data: {
      x: entity.x,
      y: entity.y,
      a: entity.a
    }
  });

  if(self.newPeers.length) {
    self.newPeers.forEach(function (id) {
      self.network.sendTo(id, JSON.stringify([
        {
          type: 'weapon',
          data: {
            weapon: entity.weapon.name
          }
        },
        {
          type: 'position',
          data: {
            x: entity.x,
            y: entity.y,
            a: entity.a,
            fill: entity.fill
          }
        }
      ]));
    });

    self.newPeers = [];
  }
};

Output.prototype.newPeer_ = function(id) {
  this.newPeers.push(id);
};
