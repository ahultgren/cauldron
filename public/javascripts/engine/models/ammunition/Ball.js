'use strict';

module.exports = {
  components: {
    Physics: require('../../components/physics/BallPhysics'),
    Graphics: require('../../components/graphics/BallGraphics'),
    Collision: require('../../components/collision/BallCollision')
  },
  data: {
    boundingBoxShape_: 'circle',
    radius: 8,
    fill: 'cyan',
    explosionDuration: 5
  }
};
