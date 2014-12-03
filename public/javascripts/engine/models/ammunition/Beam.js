'use strict';

module.exports = {
  components: {
    Physics: require('../../components/physics/BeamPhysics'),
    Graphics: require('../../components/graphics/BeamGraphics'),
    Collision: require('../../components/collision/BeamCollision'),
    Shape: require('../../components/shapes/line')
  },
  data: {
    aliveUntil: 2,
    aliveFor: 0
  }
};
