'use strict';

// [TODO] Use some kind of framework
var fs = require('fs');
var hb = require('handlebars');
var router = require('./router');

var mainMenu = document.querySelector('#main-menu');

exports.name = require('./name');
exports.fullscreen = require('./fullscreen');
exports.score = require('./score');

var TEMPLATES = {
  create: hb.compile(fs.readFileSync('public/partials/create.hbs').toString()),
  start: hb.compile(fs.readFileSync('public/partials/start.hbs').toString())
};

router.route('/', function () {
  //## Ensure main menu is shown?
  mainMenu.innerHTML = TEMPLATES.start({
    playerName: exports.name.loadName()
  });
});

router.route('/create', function () {
  //## Ensure main menu is shown?
  mainMenu.innerHTML = TEMPLATES.create({});
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
