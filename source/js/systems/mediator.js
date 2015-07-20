'use strict';

class Mediator {
  static create () {
    return new Mediator();
  }

  constructor () {
    this.events = {};
  }

  tick () {
    this.events = {};
  }

  emit (name, data) {
    // [TODO] Support more than one event per event name per tick
    if(this.events[name]) {
      this.events[name].push(data);
    }
    else {
      this.events[name] = [data];
    }
  }

  triggered (name) {
    return this.events[name] || [];
  }
}

module.exports = Mediator;
