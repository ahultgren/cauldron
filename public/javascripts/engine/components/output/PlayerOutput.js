'use strict';

// [TODO] Extract from game engine?

var R = require('ramda');

var Output = module.exports = function PlayerOutput (settings) {
  this.newPeers = [];
  this.network = settings.network;

  // Hack to be able to unlisten
  this.newPeerListener = this.newPeer_.bind(this);
  this.network.on('newPeer', this.newPeerListener);
};

Output.create = function (settings) {
  return new Output(settings);
};

Output.prototype.init = function(entity) {
  var self = this;

  function actionWeaponListener (action, data) {
    self.network.outgoing.push({
      type: action + 'Weapon',
      data: data
    });
  }

  entity.mediator.on('shot', R.lPartial(actionWeaponListener, 'shoot'));

  entity.mediator.on('newPowerup', function (powerup) {
    self.network.outgoing.push({
      type: 'newPowerup',
      data: powerup
    });
  });
};

// [TODO] Cleanup when player is done converting
Output.prototype.update = Output.prototype.updateEvent = function(entity) {
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
            weapon: entity.data.weaponName
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

Output.prototype.remove = function() {
  this.network.removeListener('newPeer', this.newPeerListener);
};

/* Private
============================================================================= */

Output.prototype.newPeer_ = function(id) {
  this.newPeers.push(id);
};
