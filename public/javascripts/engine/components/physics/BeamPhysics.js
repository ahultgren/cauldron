'use strict';

var util = require('util');
var utils = require('../../utils');
var Component = require('../Component');


var Physics = module.exports = function BeamPhysics (settings) {
  this.constructor.super_.call(this, {}, settings);
};

util.inherits(Physics, Component);


Physics.prototype.init = function(entity) {
  // Allow for setting a and b
  if(!entity.data.b) {
    this.makeLine_(entity);
  }
};

Physics.prototype.update = function() {
};


/* Private
============================================================================= */

Physics.prototype.makeLine_ = function(entity) {
  var i, l, intersection, minIntersection, angle, line;

  angle = Math.atan2(entity.toward.y - entity.from.data.y, entity.toward.x - entity.from.data.x);

  // Accuracy
  angle = angle + entity.data.spread;

  line = {
    a: {
      x: entity.from.data.x,
      y: entity.from.data.y
    },
    // Start with a really long line...
    b: {
      x: entity.from.data.x + Math.cos(angle)*1000000,
      y: entity.from.data.y + Math.sin(angle)*1000000
    }
  };

  // ...find intersecting map segments...
  for(i = 0, l = this.segments.length; i < l; i++) {
    intersection = utils.getIntersection(line, this.segments[i]);

    if(!minIntersection && intersection || minIntersection && intersection && intersection.param < minIntersection.param) {
      // ...and make the line as short as possible
      minIntersection = intersection;
    }
  }

  entity.data.path = [entity.from.data, minIntersection];
};
