'use strict';

module.exports = {
  components: {
    Physics: require('../../components/physics/RocketPhysics'),
    Graphics: require('../../components/graphics/RocketGraphics'),
    Collision: require('../../components/collision/RocketCollision')
  },
  data: {
    fill: '#999',
    explosionDuration: 5,
    inflationSpeed: 8,
    path: [{x: 10, y: 0}, {x: -5, y: -5}, {x: -5, y: 5}]
  }
};
