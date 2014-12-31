'use strict';

var R = require('ramda');
var Script = module.exports = exports;

Script.create = function () {
  return Script;
};

Script.init = function(entity) {
  entity.mediator.on('inputmousedown', R.lPartial(triggerStart, entity));
  entity.mediator.on('inputmouseup', R.lPartial(triggerEnd, entity));
};

Script.update = function() {};
Script.remove = function() {};

/* Private
============================================================================= */

function triggerStart (entity) {
  var from, toward, spread;

  if(entity.weapon) {
    from = entity;
    toward = entity.input.mouse;
    spread = entity.weapon.spread;

    entity.weapon.mediator.emit('triggerStart', from, toward, spread);
  }
}

function triggerEnd (entity) {
  if(entity.weapon) {
    entity.weapon.mediator.emit('triggerEnd');
  }
}
