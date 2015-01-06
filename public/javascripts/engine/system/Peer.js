'use strict';

var PeerInput = require('../components/input/PeerInput');
var PeerPlayerPowerups = require('../components/powerups/PeerPlayerPowerups');
var WeaponScript = require('../components/script/WeaponScript');

var Peer = module.exports = function Peer (game, id, conn) {
  this.game = game;
  this.id = id;
  this.conn = conn;

  this.player = this.game.factories.player([
    new PeerInput({
      conn: conn,
      game: this.game
    }),
    PeerPlayerPowerups.create(),
    WeaponScript.create()
  ]);
};

Peer.prototype.remove = function() {
  this.conn.removeAllListeners();
  this.player.remove();
};
