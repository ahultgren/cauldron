'use strict';

module.exports = {
  components: [
    require('../../components/physics/BeamPhysics'),
    require('../../components/collision/BeamCollision'),
    require('../../components/shapes/line')
  ],
  stage2Components: [
    require('../../components/graphics/BeamGraphics')
  ],
  data: {
    aliveUntil: 2,
    aliveFor: 0
  }
};
