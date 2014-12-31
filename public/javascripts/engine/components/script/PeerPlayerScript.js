'use strict';

var util = require('util');
var Component = require('../Component');
var R = require('ramda');

var Script = module.exports = function PeerPlayerScript () {};

util.inherits(Script, Component);

Script.prototype.init = function(entity) {
  entity.input.on('triggerStart', R.lPartial(triggerStart, entity));
  entity.input.on('triggerEnd', R.lPartial(triggerEnd, entity));
};

Script.prototype.update = function(){};

function triggerStart (entity, settings) {
  var from, toward, spread;

  if(entity.weapon) {
    from = settings.from || entity;
    toward = settings.toward;
    spread = settings.spread || entity.weapon.spread;

    entity.weapon.mediator.emit('triggerStart', from, toward, spread);
  }
}

function triggerEnd (entity) {
  if(entity.weapon) {
    entity.weapon.mediator.emit('triggerEnd');
  }
}
