'use strict';

class Expire {
  static create () {
    return new Expire();
  }

  constructor () {
  }

  tick (entities) {
    entities.forEach((entity) => {
      if(!entity.hasComponent('expire')) {
        return;
      }

      var expire = entity.getComponent('expire');

      expire.frame++;

      if(expire.frame >= expire.duration) {
        this.game.removeEntity(entity.id);
      }
    });
  }
}

module.exports = Expire;
