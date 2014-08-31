'use strict';

//## This doesn't feel right. Will anything else than a player use output?

var util = require('util');
var Component = require('../Component');


var Output = module.exports = function PlayerOutput (settings) {
  this.constructor.super_.call(this, {
    newPeers: []
  }, settings);
  // this.network

  // Hack to be able to unlisten
  this.newPeerListener = this.newPeer_.bind(this);
  this.network.on('newPeer', this.newPeerListener);
};

util.inherits(Output, Component);


Output.prototype.init = function(entity) {
  var self = this;

  function actionWeaponListener (action, data) {
    self.network.outgoing.push({
      type: action + 'Weapon',
      data: data
    });
  }

  entity.weapon.on('action', actionWeaponListener);

  entity.weapon.on('replaced', function (newComponent) {
    entity.weapon.removeListener('action', actionWeaponListener);
    newComponent.on('action', actionWeaponListener);
  });

  entity.powerups.on('newPowerup', function (powerup) {
    self.network.outgoing.push({
      type: 'newPowerup',
      data: powerup
    });
  });
};

Output.prototype.updateEvent = function(entity) {
  var self = this;
  var i, l, id;

  //## Check if update is needed; Object.observe?
  self.network.outgoing.push({
    type: 'position',
    data: {
      x: entity.data.x,
      y: entity.data.y,
      a: entity.data.a
    }
  });

  if(self.newPeers.length) {
    for(i = 0, l = self.newPeers.length; i < l; i++) {
      id = self.newPeers[i];
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
            x: entity.data.x,
            y: entity.data.y,
            a: entity.data.a,
            fill: entity.data.fill
          }
        }
      ]));
    }

    self.newPeers = [];
  }
};

Output.prototype.remove = function(entity) {
  this.constructor.super_.remove.call(this, entity);
  this.network.removeListener('newPeer', this.newPeerListener);
};

/* Private
============================================================================= */

Output.prototype.newPeer_ = function(id) {
  this.newPeers.push(id);
};
