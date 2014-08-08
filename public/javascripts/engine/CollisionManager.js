'use strict';

var SAT = require('sat');
var utils = require('./utils');

var Collisions = module.exports = function Collisions (settings) {
  utils.extend(this, settings);
  // segments
};


Collisions.prototype.testMap = function(entity) {
  var x = entity.data.x;
  var y = entity.data.y;
  var segments = this.segments;

  segments.forEach(function (seg) {
    var line = new SAT.Polygon(new SAT.V(),
      [new SAT.V(seg.a.x, seg.a.y), new SAT.V(seg.b.x, seg.b.y)]);

    var circle = new SAT.Circle(new SAT.V(x, y), entity.data.radius);

    // Continuous collision testing
    // Try extending the ray backwards and forwards
    var ray = new SAT.Polygon(new SAT.V(), extend(entity.data.last.position, entity));

    var CCDResponse = new SAT.Response();
    if(SAT.testPolygonPolygon(ray, line, CCDResponse)) {
      //if(CCDResponse.overlapV.x !== 0) console.log('collide', CCDResponse);

      x -= CCDResponse.overlapV.x;
      y -= CCDResponse.overlapV.y;

      // Recreate player collision tester object
      circle = new SAT.Circle(new SAT.V(x, y), entity.data.radius);
    }

    // Normal collision testing
    var response = new SAT.Response();
    if(SAT.testCirclePolygon(circle, line, response)) {
      x -= response.overlapV.x;
      y -= response.overlapV.y;
    }
  });

  if(x !== entity.data.x || y !== entity.data.y) {
    if(entity.collision.response_ === 'obstaclePhobic') {
      entity.data.x = x;
      entity.data.y = y;
    }

    return true;
  }
  else {
    return false;
  }
};

/**
 * Test collision and don't care about response
 */
Collisions.prototype.test = function(entity1, entity2) {
  //## CCD will be needed eventually
  //## Handle response automatically?
  var a = getShape(entity1);
  var b = getShape(entity2);

  return testXtoY(a, b);
};


/* Private
============================================================================= */

function getShape (entity) {
  switch (entity.collision.boundingBox_) {
    case 'circle':
      return new SAT.Circle(new SAT.V(entity.data.x, entity.data.y), entity.data.radius);
    case 'polygon':
      return new SAT.Polygon(new SAT.V(), entity.path.map(function (point) {
        return new SAT.V(point.x, point.y);
      }));
  }
}

function testXtoY (a, b) {
  if(isCircle(a) && isCircle(b)) {
    return SAT.testCircleCircle(a, b);
  }
  if(!isCircle(a) && !isCircle(b)) {
    return SAT.testPolygonPolygon(a, b);
  }
  if(isCircle(a) && !isCircle(b)) {
    return SAT.testCirclePolygon(a, b);
  }
  if(!isCircle(a) && isCircle(b)) {
    return SAT.testPolygonCircle(a, b);
  }
}

function isCircle (shape) {
  return 'r' in shape;
}

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
