'use strict';

var Stalker = module.exports = exports;

Stalker.create = function (target, props) {
  var stalker = Object.create(Stalker);

  stalker.target = target;
  stalker.props = props;

  return stalker;
};

Stalker.update = function (entity) {
  var self = this;

  self.props.forEach(function (prop) {
    entity.data[prop] = self.target.data[prop];
  });
};
