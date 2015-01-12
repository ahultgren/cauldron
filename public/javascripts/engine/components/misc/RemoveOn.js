'use strict';

/**
 * Remove entity when an event is triggered
 */

exports.create = function (event) {
  var remover = Object.create(exports);
  remover.event = event;
  return remover;
};

exports.init = function (entity) {
  entity.mediator.on(this.event, entity.remove.bind(entity));
};
