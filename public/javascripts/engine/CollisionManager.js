'use strict';

var SAT = require('sat');
var utils = require('./utils');

var Collisions = module.exports = function Collisions (settings) {
  utils.extend(this, settings);
  // segments
};


Collisions.prototype.testMap = function(entity) {
  var x = entity.x;
  var y = entity.y;
  var segments = this.segments;

  segments.forEach(function (seg) {
    var line = new SAT.Polygon(new SAT.V(),
      [new SAT.V(seg.a.x, seg.a.y), new SAT.V(seg.b.x, seg.b.y)]);

    var circle = new SAT.Circle(new SAT.V(x, y), entity.radius);

    // Continuous collision testing
    // Try extending the ray backwards and forwards
    var ray = new SAT.Polygon(new SAT.V(), extend(entity.lastPos, entity));

    var CCDResponse = new SAT.Response();
    if(SAT.testPolygonPolygon(ray, line, CCDResponse)) {
      //if(CCDResponse.overlapV.x !== 0) console.log('collide', CCDResponse);

      x -= CCDResponse.overlapV.x;
      y -= CCDResponse.overlapV.y;

      // Recreate player collision tester object
      circle = new SAT.Circle(new SAT.V(x, y), entity.radius);
    }

    // Normal collision testing
    var response = new SAT.Response();
    if(SAT.testCirclePolygon(circle, line, response)) {
      x -= response.overlapV.x;
      y -= response.overlapV.y;
    }
  });

  if(x !== entity.x || y !== entity.y) {
    if(entity.collision.response_ === 'obstaclePhobic') {
      entity.x = x;
      entity.y = y;
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
  //## Test other stuff than circles
  var a = new SAT.Circle(new SAT.V(entity1.x, entity1.y), entity1.radius);
  var b = new SAT.Circle(new SAT.V(entity2.x, entity2.y), entity2.radius);

  return SAT.testCircleCircle(a, b);
};


/* Private
============================================================================= */

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
