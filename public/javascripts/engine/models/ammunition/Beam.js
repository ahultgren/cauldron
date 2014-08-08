'use strict';

module.exports = {
  components: {
    Physics: require('../../components/physics/BeamPhysics'),
    Graphics: require('../../components/graphics/BeamGraphics'),
    Collision: require('../../components/collision/BeamCollision')
  },
  data: {
    aliveUntil: 2,
    aliveFor: 0
  }
};
