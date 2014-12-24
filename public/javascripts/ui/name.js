'use strict';

var R = require('ramda');
var Bacon = require('baconjs');

var nameInput = document.querySelector('#player-name');
var hudName = document.querySelector('#hud-name');

var currentName = Bacon.fromEventTarget(nameInput, 'input')
  .map(R.path('target.value'))
  .toProperty(loadName());

// [TODO] This does not seem idiomatic
currentName.onValue(setInputName);
currentName.onValue(setHudName);
currentName.onValue(saveName);

function setHudName (name) {
  hudName.innerHTML = name;
}

function setInputName (name) {
  nameInput.value = name;
}

function saveName (name) {
  window.localStorage.setItem('playerName', name);
}

function loadName () {
  return window.localStorage.getItem('playerName') || '';
}
