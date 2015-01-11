'use strict';

module.exports = {
  components: [
    require('../../components/physics/BeamPhysics'),
    require('../../components/collision/BeamCollision'),
    require('../../components/shapes/line'),
    require('../../components/misc/RemoveAfter')
  ],
  stage2Components: [
    require('../../components/graphics/BeamGraphics')
  ],
  data: {
    removeAfter: 2
  }
};
