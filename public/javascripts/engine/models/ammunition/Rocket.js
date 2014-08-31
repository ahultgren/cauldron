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
    path: [{x: 12, y: 0}, {x: -7, y: 7}, {x: -7, y: -7}],
    influenceArea: (12 + 7)/2
  }
};
