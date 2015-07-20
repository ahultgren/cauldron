'use strict';

var findMax = (paths) => {
  var maxX = 0;
  var maxY = 0;

  paths.forEach((path) => {
    path.forEach(([x, y]) => {
      if(x > maxX) {
        maxX = x;
      }
      if(y > maxY) {
        maxY = y;
      }
    });
  });

  return [maxX, maxY];
};

module.exports = require('../utils/component')({
  name: 'cameraBounds',
  width: 0,
  height: 0,
});

module.exports.fromPaths = (paths) => {
  var [maxX, maxY] = findMax(paths);

  return module.exports({
    width: maxX,
    height: maxY,
  });
};
