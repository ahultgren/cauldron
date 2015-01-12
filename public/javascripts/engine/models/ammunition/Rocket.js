'use strict';

module.exports = {
  spawnAtFrom: true,
  components: [
    //require('../../components/physics/RocketPhysics'),
    require('../../components/movement/acceleratingMovement'),
    require('../../components/collision/RocketCollision'),
    require('../../components/shapes/polygon'),
    [require('../../components/misc/RemoveOn'), 'collision']
  ],
  stage2Components: [
    require('../../components/graphics/RocketGraphics')
  ],
  data: {
    fill: '#999',
    explosionDuration: 5,
    inflationSpeed: 8,
    path: [{x: 12, y: 0}, {x: -7, y: 7}, {x: -7, y: -7}],
    halfWidth: (12 + 7)/2,
    halfHeight: (12 + 7)/2
  }
};
