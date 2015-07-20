'use strict';

var R = require('ramda');

module.exports = (defaults) => {
  var fn = (data = {}) => {
    return R.merge(defaults, data);
  };
  // [TODO] This would be nice: fn.name = defaults.name;
  return fn;
};
