'use strict';

var filter = require('cauldron-core/app/utils/filter');

class Score {
  static create (container) {
    return new Score(container);
  }

  constructor (container) {
    this.container = container;
  }

  tick (entities) {
    var scores = filter(entity => entity.hasComponent('score'), entities)
    .map((entity) => {
      return `${entity.id.substring(0, 8)}: ${entity.getComponent('score').score}`;
    });

    this.container.innerHTML = scores.join('<br>');
  }
}

module.exports = Score;
