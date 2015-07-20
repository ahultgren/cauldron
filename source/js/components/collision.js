'use strict';

var R = require('ramda');

module.exports = exports = require('../utils/component')({
  name: 'collision',
  aabb: '',
  shape: '',
  path: '',
  paths: '',
  radius: '',
  response: '',
});

exports.fromArc = ({radius, response}) => {
  return exports({
    shape: 'circle',
    aabb: {
      width: radius * 2,
      height: radius * 2,
      x: -radius,
      y: -radius,
    },
    radius,
    response,
  });
};

exports.fromPaths = ({paths, response}) => {
  var aabbs = paths.map((path) => {
    var xs = path.map(R.prop('0'));
    var ys = path.map(R.prop('1'));

    return {
      width: R.max(xs) - R.min(xs),
      height: R.max(ys) - R.min(ys),
      x: R.min(xs),
      y: R.min(ys),
    };
  });

  return exports({
    shape: 'paths',
    aabbs,
    paths,
    response,
  });
};
