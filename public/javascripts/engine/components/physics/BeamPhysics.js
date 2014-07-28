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
  if(!entity.b) {
    this.makeLine_(entity);
  }
};

Physics.prototype.update = function() {
  //## Collision test for other moving objects
};


/* Private
============================================================================= */

Physics.prototype.makeLine_ = function(entity) {
  var i, l, intersection, minIntersection, angle, line;
  var b = {};

  angle = Math.atan2(entity.toward.y - entity.from.y, entity.toward.x - entity.from.x);

  // Accuracy
  angle = angle + entity.spread;

  // First just make the line really long
  b.x = Math.cos(angle)*1000000;
  b.y = Math.sin(angle)*1000000;

  // Find closest intersecting segment
  line = { a: entity.from, b: b };
  for(i = 0, l = this.segments.length; i < l; i++) {
    intersection = utils.getIntersection(line, this.segments[i]);

    if(!minIntersection && intersection || minIntersection && intersection && intersection.param < minIntersection.param) {
      minIntersection = intersection;
    }
  }

  // Shorten the line
  b.x = minIntersection.x;
  b.y = minIntersection.y;

  entity.b = b;
};
