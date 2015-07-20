'use strict';

var Mediator = require('./systems/mediator');
const UPDATE_STEP = 1000 / 60;

var nextFrame = (callback) => {
  if(typeof window !== 'undefined' && window.requestAnimationFrame) {
    return window.requestAnimationFrame(callback);
  }
  if(typeof setImmediate !== 'undefined') {
    return setImmediate(callback);
  }

  setTimeout(callback, 0);
};

var nowMs = (exact = false) => {
  if(exact) {
    if(typeof window !== 'undefined' && window.performance) {
      return window.performance.now();
    }
    if(typeof process !== 'undefined' && process.hrtime) {
      let [s, ns] = process.hrtime();
      return s * 1e3 + ns / 1e6;
    }
  }

  return Date.now();
};

class Game {
  static create () {
    return new Game();
  }

  constructor () {
    this.playing = false;
    this.entities = new Map();
    this.systems = [];
    this.renderSystems = [];
    this.mediator = Mediator.create();
  }

  addEntity (entity) {
    this.entities.set(entity.id, entity);
    return this;
  }

  getEntity (id) {
    return this.entities.get(id);
  }

  removeEntity (id) {
    this.entities.get(id).remove = true;
    return this;
  }

  addSystem (system) {
    this.systems.push(system);
    system.mediator = this.mediator;
    system.game = this;
  }

  addRenderSystem (system) {
    this.renderSystems.push(system);
    system.mediator = this.mediator;
    system.game = this;
  }

  loop () {
    if(!this.playing) {
      return;
    }

    nextFrame(() => this.loop());

    var currentTime = nowMs(true);
    var remaining = currentTime - this.lastLoopTime;
    this.lastLoopTime = currentTime;

    // Failsafe when a lot of frames has been skipped
    if(remaining > UPDATE_STEP * 60) {
      return;
    }

    // Not sure why 10 is needed, but seems the fps is not very exact
    while(Math.abs(remaining -= UPDATE_STEP) < 10) {
      this.update();
    }

    this.render();
  }

  update () {
    this.entities.forEach((entity) => {
      if(entity.remove) {
        this.entities.delete(entity.id);
      }
    });
    this.systems.forEach(system => system.tick(this.entities));
  }

  render () {
    this.renderSystems.forEach(system => system.tick(this.entities));
  }

  setMap (map) {
    this.map = map;
  }

  start () {
    // Mediator last
    this.addSystem(this.mediator); // [TODO] breaks if pausing the game...
    this.playing = true;
    this.lastLoopTime = nowMs();
    this.loop();
    return this;
  }

  stop () {
    this.playing = false;
    return this;
  }
}

module.exports = Game;
