'use strict';

class Animation {
  static create () {
    return new Animation();
  }

  constructor () {
  }

  tick (entities) {
    entities.forEach((entity) => {
      if(!entity.hasComponent('animation')) {
        return;
      }

      var animation = entity.getComponent('animation');
      var appearance = entity.getComponent('appearance');

      if(animation.frame < animation.duration) {
        animation.frame++;
      }

      if(animation.animation === 'shrink') {
        // Only handle arcs for now
        appearance.radius -= appearance.radius / (animation.duration - animation.frame);
      }
    });
  }
}

module.exports = Animation;
