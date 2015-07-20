'use strict';

var factories = require('../factories');

class Factory {
  static create () {
    return new Factory();
  }

  constructor () {

  }

  tick (entities) {
    entities.forEach((entity) => {
      if(!entity.hasComponent('factory')) {
        return;
      }

      var factory = entity.getComponent('factory');

      this.mediator.triggered(factory.event).forEach((e) => {
        var spawn = factories[factory.factory](entity, e);
        this.game.addEntity(spawn);
        this.mediator.emit('spawn', {spawn, spawner: entity});
      });
    });
  }
}

module.exports = Factory;
