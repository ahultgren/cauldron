'use strict';

var SAT = require('sat');
var utils = require('./utils');

var ALMOST_ZERO = 0.01;


var Collisions = module.exports = function Collisions (settings) {
  utils.extend(this, settings);
  // paths

  this.response = new SAT.Response();
};


Collisions.prototype.mapTests = function(collidable) {
  var i, l, ii, ll;
  var entity, seg, line;
  var paths = this.paths;
  var response;

  for(i = 0, l = collidable.length; i < l; i++) {
    entity = collidable[i];

    if(
      Math.abs(entity.data.dx) < ALMOST_ZERO &&
      Math.abs(entity.data.dy) < ALMOST_ZERO
    ) {
      continue;
    }

    if(
      entity.data.dx < entity.aabb.halfWidth &&
      entity.data.dy < entity.aabb.halfHeight
    ) {
      // aabb-aabb test
      for(ii = 0, ll = paths.length; ii < ll; ii++) {
        seg = paths[ii];
        line = new SAT.Polygon(new SAT.V(),
          [new SAT.V(seg[0].x, seg[0].y), new SAT.V(seg[1].x, seg[1].y)]);

        if(testAabbAabb(entity.aabb, seg.aabb)) {
          // Normal SAT test
          response = this.response;

          //## All entities should have an entity.shape which is instance of SAT.P|C and updates itself
          if(testXtoMap(getShape(entity), line, response.clear())) {
            if(entity.collision.response_ === 'obstaclePhobic') {
              entity.data.x -= response.overlapV.x;
              entity.data.y -= response.overlapV.y;
            }

            collidable[i].onCollision('map');
          }
        }
      }
    }
    else {
      //## Sweep aabb-aabb test
      if(this.testMap(entity)) {
        collidable[i].onCollision('map');
      }
    }
  }
};

Collisions.prototype.obstacleTests = function(collidable, obstacles) {
  var i, l, ii, ll, entity, obstacle;

  for(i = 0, l = collidable.length; i < l; i++) {
    entity = collidable[i];

    if(
      Math.abs(entity.data.dx) < ALMOST_ZERO &&
      Math.abs(entity.data.dy) < ALMOST_ZERO
    ) {
      continue;
    }

    for(ii = 0, ll = obstacles.length; ii < ll; ii++) {
      obstacle = obstacles[ii];

      //## Implement sweep-tests here if either party is moving fast

      if(testAabbAabb(entity.aabb, obstacle.aabb)) {
        if(this.test(entity, obstacle)) {
          entity.onCollision('obstacle', obstacle);
          obstacle.onCollision('collidable', entity);
        }
      }
    }
  }
};

Collisions.prototype.collidableTests = function(collidable) {
  var i, l, ii;

  for(i = 0, l = collidable.length; i < l; i++) {
    for(ii = i + 1; ii < l; ii++) {
      if(testAabbAabb(collidable[i].aabb, collidable[ii].aabb)) {
        if(this.test(collidable[i], collidable[ii])) {
          collidable[i].onCollision('collidable', collidable[ii]);
          collidable[ii].onCollision('collidable', collidable[i]);
        }
      }
    }
  }
};

Collisions.prototype.testMap = function(entity) {
  var x = entity.data.x;
  var y = entity.data.y;
  var segments = this.paths;
  var response = this.response;
  var seg, line, entityTest, ray;
  var i, l;

  for(i = 0, l = segments.length; i < l; i++) {
    seg = segments[i];

    line = seg.line;

    entityTest = getShape(entity);

    // Continuous collision testing
    // Try extending the ray backwards and forwards
    ray = new SAT.Polygon(new SAT.V(), extend(entity.data.last.position, entity.data));

    if(SAT.testPolygonPolygon(ray, line, response.clear())) {
      x -= response.overlapV.x;
      y -= response.overlapV.y;
      response.clear();

      // Recreate player collision tester object
      entityTest = getShape(entity);
    }

    // Normal collision testing
    if(testXtoMap(entityTest, line, response.clear())) {
      x -= response.overlapV.x;
      y -= response.overlapV.y;
      response.clear();
    }
  }

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
  //## Sweeping will be needed eventually
  //## Handle response automatically?
  var a = getShape(entity1);
  var b = getShape(entity2);

  return testXtoY(a, b);
};


/* Private
============================================================================= */

function getShape (entity) {
  if(!entity.shape) {
    throw new Error('Entity has no shape');
  }

  return entity.shape;
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

function testAabbAabb (a, b) {
  var distanceX = a.x - b.x;
  var distanceY = a.y - b.y;

  return Math.abs(distanceX) < a.halfWidth + b.halfWidth &&
    Math.abs(distanceY) < a.halfHeight + b.halfHeight &&
    {
      x: distanceX < a.halfWidth + b.halfWidth,
      y: distanceY < a.halfHeight + b.halfHeight
    };
}

function isCircle (shape) {
  return shape.isCircle;
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
