'use strict';

module.exports = {
  components: {
    Physics: require('../../components/physics/BallPhysics'),
    Graphics: require('../../components/graphics/BallGraphics'),
    Collision: require('../../components/collision/ObstaclePhobicCollision')
  },
  settings: {
    boundingBoxShape_: 'circle',
    radius: 8,
    fill: 'cyan'
  }
};
