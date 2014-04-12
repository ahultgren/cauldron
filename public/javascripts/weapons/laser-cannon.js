'use strict';

var Beam = require('./ammunition/beam');
var utils = require('../utils');


var LaserCannon = module.exports = function (settings) {
  utils.extend(this, settings);
};

LaserCannon.prototype.shoot = function (from, toward) {
  var beam = new Beam({
    from: from,
    toward: toward,
    segments: this.map.segments
  });

  this.game
    .add('masked', beam)
    .add('moving', beam);
};
