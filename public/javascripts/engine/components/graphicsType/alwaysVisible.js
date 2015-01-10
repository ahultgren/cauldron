'use strict';

exports.create = function () {
  return exports;
};

exports.init = function (entity) {
  entity.data.gco_ = 'alwaysVisible';
};
