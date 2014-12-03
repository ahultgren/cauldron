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

  // Generate aabb-data
  entity.data.halfWidth = Math.abs(entity.data.path[0].x - entity.data.path[1].x)/2;
  entity.data.halfHeight = Math.abs(entity.data.path[0].y - entity.data.path[1].y)/2;

  entity.data.aabbX = Math.min(entity.data.path[0].x, entity.data.path[1].x) + entity.data.halfWidth;
  entity.data.aabbY = Math.min(entity.data.path[0].y, entity.data.path[1].y) + entity.data.halfHeight;
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

  // Start with a really long line...
  entity.data.path = line = [
    entity.from.data,
    {
      x: entity.from.data.x + Math.cos(angle)*1000000,
      y: entity.from.data.y + Math.sin(angle)*1000000
    }
  ];

  // ...find the closest intersecting map segment...
  for(i = 0, l = this.paths.length; i < l; i++) {
    intersection = utils.getIntersection(line, this.paths[i]);

    if(!minIntersection && intersection || minIntersection && intersection && intersection.param < minIntersection.param) {
      minIntersection = intersection;
    }
  }

  // ...and shorten the line
  line[1].x = minIntersection.x;
  line[1].y = minIntersection.y;
};
