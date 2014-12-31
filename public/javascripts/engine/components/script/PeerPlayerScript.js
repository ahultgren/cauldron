'use strict';

var R = require('ramda');
var Script = module.exports = exports;

Script.create = function () {
  return Script;
};

Script.init = function(entity) {
  entity.input.on('triggerStart', R.lPartial(triggerStart, entity));
  entity.input.on('triggerEnd', R.lPartial(triggerEnd, entity));
};

Script.update = function(){};
Script.remove = function(){};

/* Helpers
============================================================================= */

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
