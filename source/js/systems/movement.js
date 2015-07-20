'use strict';

var movable = entity => entity.hasComponents('position', 'physics');
var ALMOST_ZERO = 0.000001;

class Movement {
  static create (canvas) {
    return new Movement(canvas);
  }

  constructor () {
  }

  tick (entities) {
    entities.forEach((entity) => {
      if(!movable(entity)) {
        return;
      }

      var position = entity.getComponent('position');
      var physics = entity.getComponent('physics');

      position.lastX = physics.x;
      position.lastY = physics.y;
      position.x += physics.dx;
      position.y += physics.dy;

      physics.lastDx = physics.dx;
      physics.lastDy = physics.dy;
      physics.dx *= physics.friction;
      physics.dy *= physics.friction;

      if(Math.abs(physics.dx) < ALMOST_ZERO) {
        physics.dx = 0;
      }

      if(Math.abs(physics.dy) < ALMOST_ZERO) {
        physics.dy = 0;
      }
    });
  }
}

module.exports = Movement;
