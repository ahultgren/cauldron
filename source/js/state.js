'use strict';

var Baobab = require('baobab');
var Bacon = require('baconjs');
var R = require('ramda');

// Monkey patch cursors to get them as Bacon properties
var Cursor = require('baobab/src/cursor');
var Facet = require('baobab/src/facet');

Cursor.prototype.asProperty = Facet.prototype.asProperty = function () {
  var cursor = this;

  return Bacon.fromEventTarget(cursor, 'update')
    .map(() => cursor.get())
    .toProperty(cursor.get());
};

var state = module.exports = new Baobab({
  games: [],
  currentGameId: '',
  player: {},
}, {
  facets: {
    currentGame: {
      cursors: {
        id: ['currentGameId'],
      },
      get: ({id}) => {
        var games = state.select('games').get();
        return R.find(R.propEq('game_id', id), games);
      }
    }
  }
});
