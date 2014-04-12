'use strict';

var utils = require('../../utils');

var Beam = module.exports = function (settings) {
  utils.extend(this, {
    aliveUntil: 2,
  }, settings);

  // Allow for setting a and b
  if(!this.a && !this.b) {
    this.makeLine();
  }

  this.aliveFor = 0;
};

Beam.prototype.makeLine = function() {
  var i, l,
      intersection,
      minIntersection,
      angle;

  var line = {
    a: {
      x: this.from.x,
      y: this.from.y
    },
    b: {}
  };

  angle = Math.atan2(this.toward.y - this.from.y, this.toward.x - this.from.x);

  // First just make the line really long
  line.b.x = Math.cos(angle)*1000000;
  line.b.y = Math.sin(angle)*1000000;

  // Find closest intersecting segment
  for(i = 0, l = this.segments.length; i < l; i++) {
    intersection = utils.getIntersection(line, this.segments[i]);

    if(!minIntersection && intersection || minIntersection && intersection && intersection.param < minIntersection.param) {
      minIntersection = intersection;
    }
  }

  // Shorten the line
  line.b.x = minIntersection.x;
  line.b.y = minIntersection.y;

  this.a = line.a;
  this.b = line.b;
};

Beam.prototype.move = function() {
  //## Collision test for other moving objects
  this.a.x = this.from.x;
  this.a.y = this.from.y;
};

Beam.prototype.draw = function (ctx) {
  if((this.aliveFor++) >= this.aliveUntil) {
    this._remove = true;
    return;
  }

  ctx.strokeStyle = '#c63';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(this.a.x, this.a.y);
  ctx.lineTo(this.b.x, this.b.y);
  ctx.stroke();
};
