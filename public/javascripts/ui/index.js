'use strict';

// [TODO] Use some kind of framework
var router = require('./router');

require('./name');
require('./fullscreen');

exports.score = require('./score');

router.route('/create', function () {
  //## Render and show game creation ui
});

router.route('/game/:gameId', function () {
  //## Render a view for a game
});

router.route('/play', function () {
  //## Hide ui (show hud?)
});

router.route('/stats', function () {
  //## Show stats-overlay?
});
