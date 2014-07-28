'use strict';

module.exports = {
  components: {
    Physics: require('../../components/physics/BeamPhysics'),
    Graphics: require('../../components/graphics/BeamGraphics')
  },
  settings: {
    aliveUntil: 2,
    aliveFor: 0
  }
};
