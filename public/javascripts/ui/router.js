'use strict';

var R = require('ramda');
var Rx = require('rx/dist/rx.lite.min');
var Route = require('./route');
var routes = [];

var extractHash = R.compose(R.prop(1), R.split('#'));
var matchRoute = R.nAry(1, R.compose(R.prop(0), R.flip(R.filter)(routes), R.flip(R.func('match'))));
var route = R.func('route');

Rx.Observable.merge(
  Rx.Observable.fromEvent(window, 'hashchange')
    .map(R.prop('newURL')),
  Rx.Observable.fromEvent(window, 'load')
    .map(R.compose(R.path('location.href'), R.always(window)))
  )
  .map(extractHash)
  .map(matchRoute)
  .filter(Boolean)
  .do(route)
  .subscribe();

exports.route = function (path, callback) {
  routes.push(Route.create(path, callback));
  return exports;
};
