'use strict';

var utils = require('./utils');

var Beam = module.exports = function (player, segments) {
  var i, l,
      intersection,
      minIntersection;

  var line = {
    a: {
      x: player.x,
      y: player.y
    },
    b: {}
  };

  // First just make the line really long
  line.b.x = Math.cos(player.a)*1000000;
  line.b.y = Math.sin(player.a)*1000000;

  // Find closest intersecting segment
  for(i = 0, l = segments.length; i < l; i++) {
    intersection = utils.getIntersection(line, segments[i]);

    if(!minIntersection && intersection || minIntersection && intersection && intersection.param < minIntersection.param) {
      minIntersection = intersection;
    }
  }

  // Shorten the line
  line.b.x = minIntersection.x;
  line.b.y = minIntersection.y;

  this.a = line.a;
  this.b = line.b;
  this.aliveFor = 0;
  this.player = player;
};

Beam.prototype.move = function() {
  // Collision test for other moving objects
  if((this.aliveFor) < 3) {
    this.a.x = this.player.x;
    this.a.y = this.player.y;
  }
};

Beam.prototype.draw = function (ctx) {
  if((this.aliveFor++) < 3) {
    ctx.strokeStyle = '#c63';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.stroke();
  }
  else {
    //## Need a way of destroying the object
  }
};
