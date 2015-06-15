'use strict';

var Mediator = require('./systems/mediator');

class Game {
  static create () {
    return new Game();
  }

  constructor () {
    this.playing = false;
    this.entities = new Map();
    this.systems = [];
    this.mediator = Mediator.create();
  }

  addEntity (entity) {
    this.entities.set(entity.id, entity);
    return this;
  }

  addSystem (system) {
    this.systems.push(system);
    system.mediator = this.mediator;
    system.game = this;
  }

  loop () {
    if(!this.playing) {
      return;
    }

    window.requestAnimationFrame(() => this.loop());
    this.systems.forEach(system => system.tick(this.entities));
  }

  start () {
    // Mediator last
    this.addSystem(this.mediator);
    this.playing = true;
    this.loop();
    return this;
  }

  stop () {
    this.playing = false;
    return this;
  }
}

module.exports = Game;
