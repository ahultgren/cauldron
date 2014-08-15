'use strict';

module.exports = {
  components: {
    Physics: require('../../components/physics/RocketPhysics'),
    Graphics: require('../../components/graphics/RocketGraphics')
  },
  data: {
    fill: '#500',
    explosionDuration: 5,
    path: [{x: 10, y: 0}, {x: -5, y: 5}, {x: -5, y: -5}]
  }
};
