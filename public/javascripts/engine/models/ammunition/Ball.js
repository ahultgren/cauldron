'use strict';

module.exports = {
  components: [
    require('../../components/physics/BallPhysics'),
    require('../../components/collision/BallCollision'),
    require('../../components/shapes/circle'),
    [require('../../components/misc/RemoveOn'), 'collision']
  ],
  stage2Components: [
    require('../../components/graphics/BallGraphics')
  ],
  data: {
    radius: 8,
    fill: 'cyan',
    explosionDuration: 5
  }
};
