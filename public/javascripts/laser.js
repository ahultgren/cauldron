'use strict';

var Beam = require('./beam');


module.exports = function (game) {
  window.addEventListener('mousedown', function () {
    var beam = new Beam(game.playerOne, game.map.segments, game.cursor);

    game.loop.masked.push(beam);
    game.loop.moving.push(beam);
  }, false);
};
