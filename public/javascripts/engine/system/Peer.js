'use strict';

var PeerInput = require('../components/input/PeerInput');
var PeerPlayerScript = require('../components/script/PeerPlayerScript');
var PeerPlayerPowerups = require('../components/powerups/PeerPlayerPowerups');

var Peer = module.exports = function Peer (game, id, conn) {
  this.game = game;
  this.id = id;
  this.conn = conn;

  this.player = this.game.factories.player({
    input: new PeerInput({
      conn: conn,
      game: this.game
    }),
    script: PeerPlayerScript.create(),
    powerups: PeerPlayerPowerups.create()
  });
};

Peer.prototype.remove = function() {
  this.conn.removeAllListeners();
  this.player.remove();
};
