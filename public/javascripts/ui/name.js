'use strict';

var R = require('ramda');
var Bacon = require('baconjs');

var mainMenu = document.querySelector('#main-menu');
var nameInputId = 'player-name';
var hudName = document.querySelector('#hud-name');

var currentName = Bacon.fromEventTarget(mainMenu, 'input')
  .filter(function (e) {
    return e.target.id === nameInputId;
  })
  .map(R.path('target.value'))
  .toProperty(loadName());

// [TODO] This does not seem idiomatic
currentName.onValue(setHudName);
currentName.onValue(saveName);

function setHudName (name) {
  hudName.innerHTML = name;
}

function saveName (name) {
  window.localStorage.setItem('playerName', name);
}

function loadName () {
  return window.localStorage.getItem('playerName') || '';
}

exports.loadName = loadName;
