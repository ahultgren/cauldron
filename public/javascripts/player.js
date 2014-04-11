'use strict';

var keyboard = require('./input/keyboard');
var mouse = require('./input/mouse');
var VisibilityPolygon = require('./visibility-polygon');
var SAT = require('sat');


var Player = module.exports = function (game, x, y) {
  this.game = game;

  this.x = x;
  this.y = y;
  this.lastPos = {
    x: x,
    y: y
  };

  this.radius = 5;
  this.a = 0;
  this.dx = 0;
  this.dy = 0;
  this.acc = 0.8;
  this.friction = 0.8;

  this.fill = '#f00';

  this.visibilityPolygon = new VisibilityPolygon(game, this);

  game.loop.moving.push(this);

  game.loop.masked.push(this);
  game.loop.visibilityPolygons.push(this.visibilityPolygon);
};

Player.prototype.move = function() {
  // Acceleration
  this.dx += keyboard.a && -this.acc || keyboard.d && this.acc || 0;
  this.dy += keyboard.w && -this.acc || keyboard.s && this.acc || 0;

  // Friction
  this.dx *= this.friction;
  this.dy *= this.friction;

  this.lastPos.x = this.x;
  this.lastPos.y = this.y;

  this.x += this.dx;
  this.y += this.dy;

  this.a = Math.atan2(mouse.y-this.y, mouse.x-this.x);

  this.collisionTest();
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
  var segments = this.game.map.segments;
  var intersection;
  var response = new SAT.Response();
  var l = segments.length;

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
