'use strict';

var Beam = require('./beam');


module.exports = function (game) {
  window.addEventListener('mousedown', function () {
    var beam = new Beam(game.playerOne, game.map.segments, game.cursor);

    game
      .add('masked', beam)
      .add('moving', beam);
  }, false);
};
