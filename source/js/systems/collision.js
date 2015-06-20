'use strict';

var isCollidable = entity => entity.hasComponents('collision', 'position');
var isMoving = entity => entity.hasComponents('collision', 'position', 'physics');
var isActuallyMoving = entity =>
  Math.abs(entity.getComponent('physics').dx) > 0 || Math.abs(entity.getComponent('physics').dy) > 0;

var filterSet = (fn, set) => {
  var result = [];

  set.forEach((item) => {
    if(fn(item)) {
      result.push(item);
    }
  });

  return result;
};

var makeBroadRect = ({x, y, dx, dy, width, height}) => {
  return {
    x: dx > 0 ? x : x + dx,
    y: dy > 0 ? y : y + dy,
    width: dx > 0 ? width + dx : width - dx,
    height: dy > 0 ? height + dy : height - dy,
  };
};

var makeRect = (entity) => {
  var position = entity.getComponent('position');
  var {dx, dy} = entity.getComponent('physics');
  var {x, y, width, height} = entity.getComponent('collision').aabb;

  // [TODO] Need to compensate for rotation when using offset?
  return {
    id: entity.id,
    x: position.x + position.offsetX + (x || 0),
    y: position.y + position.offsetY + (y || 0),
    width,
    height,
    dx,
    dy,
  };
};

var makeRects = (entity) => {
  var collision = entity.getComponent('collision');
  var position = entity.getComponent('position');

  // [TODO] Need to compensate for rotation when using offset?
  return collision.aabbs.map(({x, y, width, height}) => {
    return {
      id: entity.id,
      x: position.x + position.offsetX + (x || 0),
      y: position.y + position.offsetY + (y || 0),
      width,
      height,
    };
  });
};

var aabbTest = (rect1, rect2) => {
  return rect1.x < rect2.x + rect2.width
    && rect1.x + rect1.width > rect2.x
    && rect1.y < rect2.y + rect2.height
    && rect1.height + rect1.y > rect2.y;
};

var sweptAABB = (a, b, v) => {
  var outVel, hitNormal;
  var hitTime = 0;
  var outTime = 1;
  var overlapTime = [0, 0];

  // Return early if a & b are already overlapping
  if(aabbTest(a, b)) {
    return false;
  }

  // Treat b as stationary, so invert v to get relative velocity
  v = {
    dx: -v.dx,
    dy: -v.dy
  };

  // X axis overlap
  if( v.dx < 0 )
  {
    if((b.x + b.width) < a.x) {
      return false;
    }
    if((b.x + b.width) > a.x) {
      outTime = Math.min( (a.x - (b.x + b.width)) / v.dx, outTime );
    }
    if((a.x + a.width) < b.x) {
      overlapTime[0] = ((a.x + a.width) - b.x) / v.dx;
      hitTime = Math.max(overlapTime[0], hitTime);
    }
  }
  else if(v.dx > 0) {
    if(b.x > (a.x + a.width)) {
      return false;
    }
    if((a.x + a.width) > b.x) {
      outTime = Math.min( ((a.x + a.width) - b.x) / v.dx, outTime );
    }
    if((b.x + b.width) < a.x) {
      overlapTime[0] = (a.x - (b.x + b.width)) / v.dx;
      hitTime = Math.max(overlapTime[0], hitTime);
    }
  }

  if(hitTime > outTime) {
    return false;
  }

  //=================================

  // Y axis overlap
  if(v.dy < 0) {
    if((b.y + b.height) < a.y) {
      return false;
    }
    if((b.y + b.height) > a.y) {
      outTime = Math.min( (a.y - (b.y + b.height)) / v.dy, outTime );
    }
    if((a.y + a.height) < b.y) {
      overlapTime[1] = ((a.y + a.height) - b.y) / v.dy;
      hitTime = Math.max(overlapTime[1], hitTime);
    }
  }
  else if(v.dy > 0) {
    if(b.y > (a.y + a.height)) {
      return false;
    }
    if((a.y + a.height) > b.y) {
      outTime = Math.min(((a.y + a.height) - b.y) / v.dy, outTime);
    }
    if((b.y + b.height) < a.y) {
      overlapTime[1] = (a.y - (b.y + b.height)) / v.dy;
      hitTime = Math.max(overlapTime[1], hitTime);
    }
  }

  if(hitTime > outTime) {
    return false;
  }

  // Scale resulting velocity by normalized hit time
  outVel = {
    dx: -v.dx * hitTime,
    dy: -v.dy * hitTime,
  };

  // Hit normal is along axis with the highest overlap time
  if(overlapTime[0] > overlapTime[1]) {
    hitNormal = [Math.sign(v.dx), 0];
  }
  else {
    hitNormal = [0, Math.sign(v.dy)];
  }

  return [outVel, hitNormal];
};

var broadTest = (mapRect) => (rect) => {
  return aabbTest(mapRect, makeBroadRect(rect));
};

/* Public API
============================================================================= */

class Collision {
  static create () {
    return new Collision();
  }

  constructor () {
  }

  tick (entities) {
    var all = filterSet(isCollidable, entities);
    var moving = all.filter(isMoving).filter(isActuallyMoving);
    this.mapTests(moving);
  }

  mapTests (entities) {
    var mapRects = makeRects(this.game.map);

    mapRects.forEach((mapRect) => {
      entities
      .map(makeRect)
      .filter(broadTest(mapRect))
      .forEach((rect) => {
        var result = sweptAABB(rect, mapRect, rect);

        if(result) {
          var entity = this.game.getEntity(rect.id);
          var physics = entity.getComponent('physics');

          physics.dx = result[0].dx;
          physics.dy = result[0].dy;

          this.mediator.emit(`collision:${rect.id}`, {});
          if(entity.getComponent('collision').response === 'die') {
            this.game.removeEntity(rect.id);
          }
        }
      });
    });
  }
}

module.exports = Collision;
