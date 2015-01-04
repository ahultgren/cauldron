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

  from = entity;
  toward = entity.data.mouse;
  spread = entity.data.spread;

  entity.mediator.emit('triggerStart', from, toward, spread);
}

function triggerEnd (entity) {
  entity.mediator.emit('triggerEnd');
}
