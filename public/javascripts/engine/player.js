'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var SAT = require('sat');
var utils = require('./utils');

var defaults = {
  _type: 'masked',
  radius: 5,
  a: 0,
  dx: 0,
  dy: 0,
  acc: 0.8,
  friction: 0.8,
  fill: '#f00'
};


var Player = module.exports = function Player (settings) {
  this.lastPos = {
    x: settings.x,
    y: settings.y
  };

  utils.extend(this, defaults, settings);

  this.input.on('mousedown', this.triggerStart.bind(this), false);
  this.input.on('mouseup', this.triggerEnd.bind(this), false);
};

util.inherits(Player, EventEmitter);


Player.prototype.triggerStart = function(settings) {
  var from, toward, spread;

  if(this.weapon) {
    from = settings.from || this;
    toward = settings.toward || this.input.mouse;
    spread = settings.spread || this.weapon.spread;

    this.weapon.triggerStart(from, toward, spread);

    this.emit('action', 'triggerStart', {
      from: {
        x: from.x,
        y: from.y
      },
      toward: {
        x: toward.x,
        y: toward.y
      },
      spread: spread
    });
  }
};


Player.prototype.triggerEnd = function() {
  if(this.weapon) {
    this.weapon.triggerEnd();

    this.emit('action', 'triggerEnd');
  }
};


Player.prototype.control = function(settings) {
  utils.extend(this, settings);
};


Player.prototype.update = function() {
  // Need to check if "slave"?

  // Acceleration
  this.dx += this.input.isDown('left') && -this.acc || this.input.isDown('right') && this.acc || 0;
  this.dy += this.input.isDown('up') && -this.acc || this.input.isDown('down') && this.acc || 0;

  // Friction
  this.dx *= this.friction;
  this.dy *= this.friction;

  this.lastPos.x = this.x;
  this.lastPos.y = this.y;
  this.lastPos.a = this.a;

  this.x += this.dx;
  this.y += this.dy;

  this.a = Math.atan2(this.input.getPosition('y')-this.y, this.input.getPosition('x')-this.x);

  this.collisionTest();

  if(this.x !== this.lastPos.x || this.y !== this.lastPos.y || this.a !== this.lastPos.a) {
    //## require('./codes').UPDATE_POSITION (to reduce networked data)
    this.emit('update_position', {
      x: this.x,
      y: this.y,
      a: this.a
    });
  }
};

Player.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, this.a + 0.5, this.a + Math.PI + 0.5, false);
  ctx.fillStyle = this.fill;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, this.a + 0.75 * Math.PI, this.a + 1.75 * Math.PI, false);
  ctx.fill();
};


Player.prototype.collisionTest = function() {
  var self = this;
  var segments = this.map.segments;
  var response = new SAT.Response();
  var l = segments.length;
  //var intersection;

  if(false && SAT.testPolygonPolygon(
    new SAT.Polygon(new SAT.V(), [
      new SAT.V(segments[l-2].a.x, segments[l-2].a.y),
      new SAT.V(segments[l-2].b.x, segments[l-2].b.y)
    ]),
    new SAT.Polygon(new SAT.V(), [
      new SAT.V(segments[l-1].a.x, segments[l-1].a.y),
      new SAT.V(segments[l-1].b.x, segments[l-1].b.y)
    ]),
    response
  )) {
      console.log('boom', response);
    }

  segments.forEach(function (seg) {
    //intersection = getLineIntersection(seg.a, seg.b, self.lastPos, self);

    var line = new SAT.Polygon(new SAT.V(),
      [new SAT.V(seg.a.x, seg.a.y), new SAT.V(seg.b.x, seg.b.y)]);

    var circle = new SAT.Circle(new SAT.V(self.x, self.y), self.radius);

    // Continuous collision testing
    // Try extending the ray backwards and forwards
    var ray = new SAT.Polygon(new SAT.V(), extend(self.lastPos, self));

    var CCDResponse = new SAT.Response();
    if(SAT.testPolygonPolygon(ray, line, CCDResponse)) {
      //if(CCDResponse.overlapV.x !== 0) console.log('collide', CCDResponse);

      self.x -= CCDResponse.overlapV.x;
      self.y -= CCDResponse.overlapV.y;

      // Recreate player collision tester object
      circle = new SAT.Circle(new SAT.V(self.x, self.y), self.radius);
    }

    // Normal collision testing
    var response = new SAT.Response();
    if(SAT.testCirclePolygon(circle, line, response)) {
      self.x -= response.overlapV.x;
      self.y -= response.overlapV.y;
    }
  });
};


function extend (from, to) {
  var newFrom = {
    x: from.x + from.x - to.x,
    y: from.y + from.y - to.y
  };
  var newTo = {
    x: to.x + to.x - from.x,
    y: to.y + to.y - from.y
  };

  return [
    new SAT.V(newFrom.x, newFrom.y),
    new SAT.V(newTo.x, newTo.y),
  ];
}
