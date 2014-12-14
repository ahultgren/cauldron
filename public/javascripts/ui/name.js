'use strict';

var Rx = require('rx/dist/rx.lite.min');
var pluck = Rx.helpers.pluck;

Rx.config.useNativeEvents = true;

var nameInput = document.querySelector('#player-name');
var hudName = document.querySelector('#hud-name');

Rx.Observable.fromEvent(nameInput, 'input')
  .map(pluck('target'))
  .map(pluck('value'))
  .do(setHudName)
  .do(saveName)
  .subscribe();

Rx.Observable.fromArray([window.localStorage.getItem('playerName')])
  .take(1)
  .filter(Boolean)
  .do(setHudName)
  .do(setInputName)
  .subscribe();

function setHudName (name) {
  hudName.innerHTML = name;
}

function saveName (name) {
  window.localStorage.setItem('playerName', name);
}

function setInputName (name) {
  nameInput.value = name;
}
