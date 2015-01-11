'use strict';

/**
 * Removes entity after set number of frames
 */

exports.create = function () {
  return exports;
};

exports.init = function (entity) {
  entity.data.expirationCounter = entity.data.expirationCounter || entity.data.removeAfter || 0;
};

exports.update = function (entity) {
  if(entity.data.expirationCounter-- <= 0) {
    entity.remove();
  }
};
