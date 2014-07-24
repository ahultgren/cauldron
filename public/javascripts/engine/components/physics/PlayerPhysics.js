'use strict';

var util = require('util');
var SAT = require('sat');
var Component = require('../Component');


var Physics = module.exports = exports = function Physics (settings) {
  this.constructor.super_.call(this, {}, settings);
  // this.map
};

util.inherits(Physics, Component);


Physics.prototype.update = function(entity) {
  entity.lastPos = {
    x: entity.x,
    y: entity.y
  };

  entity.dx *= entity.friction;
  entity.dy *= entity.friction;

  entity.x += entity.dx;
  entity.y += entity.dy;

  this.collisionTest(entity);
};


Physics.prototype.collisionTest = function(entity) {
  var self = entity;
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

