'use strict';

var SAT = require('sat');
var utils = require('./utils');

var Collisions = module.exports = function Collisions (settings) {
  utils.extend(this, settings);
  // paths
};


Collisions.prototype.testMap = function(entity) {
  var x = entity.data.x;
  var y = entity.data.y;
  var paths = this.paths;

  paths.forEach(function (seg) {
    var line = new SAT.Polygon(new SAT.V(),
      [new SAT.V(seg[0].x, seg[0].y), new SAT.V(seg[1].x, seg[1].y)]);

    var entityTest = getShape(entity);

    // Continuous collision testing
    // Try extending the ray backwards and forwards
    var ray = new SAT.Polygon(new SAT.V(), extend(entity.data.last.position, entity.data));

    var CCDResponse = new SAT.Response();
    if(SAT.testPolygonPolygon(ray, line, CCDResponse)) {
      x -= CCDResponse.overlapV.x;
      y -= CCDResponse.overlapV.y;

      // Recreate player collision tester object
      entityTest = getShape(entity);
    }

    // Normal collision testing
    var response = new SAT.Response();
    if(testXtoMap(entityTest, line, response)) {
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
      return new SAT.Polygon(new SAT.V(entity.data.x, entity.data.y),
        entity.data.path.map(function (point) {
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

function testXtoMap (a, map, response) {
  if(isCircle(a)) {
    return SAT.testCirclePolygon(a, map, response);
  }
  else {
    return SAT.testPolygonPolygon(a, map, response);
  }
}

function isCircle (shape) {
  return 'r' in shape;
}

function extend (from, to) {
  var fx = from.x !== undefined ? from.x : to.x;
  var fy = from.y !== undefined ? from.y : to.y;

  var newFrom = {
    x: fx + fx - to.x,
    y: fy + fy - to.y
  };
  var newTo = {
    x: to.x + to.x - fx,
    y: to.y + to.y - fy
  };

  return [
    new SAT.V(newFrom.x, newFrom.y),
    new SAT.V(newTo.x, newTo.y),
  ];
}
