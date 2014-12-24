'use strict';

var R = require('ramda');
var Bacon = require('baconjs');
var Route = require('./route');
var routes = [];

var extractHash = R.compose(R.or(R.prop(1), R.always('/')), R.split('#'));
var matchPathOnEachRoute = R.nAry(1, R.compose(
  R.prop(0),
  R.flip(R.filter)(routes),
  R.flip(R.func('match'))
));
var route = R.func('route');

var hashchangeUrl = Bacon.fromEventTarget(window, 'hashchange')
  .map(R.prop('newURL'));

var domreadyUrl = Bacon.fromEventTarget(window, 'load')
  .map(R.compose(R.path('location.href'), R.always(window)));

var currentUrl = hashchangeUrl.merge(domreadyUrl);

currentUrl.map(extractHash)
  .map(matchPathOnEachRoute)
  .filter(Boolean)
  .onValue(route);

exports.route = function (path, callback) {
  routes.push(Route.create(path, callback));
  return exports;
};
