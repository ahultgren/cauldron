'use strict';

import R from 'ramda';
import {Howl} from 'howler';
import filter from 'cauldron-core/app/utils/filter';

const getLocalPlayer = filter(entity => entity.hasComponent('keyboardControlled'));

const zap = new Howl({
  urls: ['sounds/zap.wav'],
});
const hit = new Howl({
  urls: ['sounds/hit.wav'],
  volume: 0.2,
});
const powerup = new Howl({
  urls: ['sounds/powerup.wav'],
});

class Sound {
  static create () {
    return new Sound();
  }

  constructor () {

  }

  tick (entities) {
    this.mediator.triggered('spawn')
    .forEach((e) => {
      // If spawner has parent it's a weapon
      if(e.spawner.hasComponent('parent')) {
        zap.play();
      }
      // If spawner has damage it's a bullet
      else if(e.spawner.hasComponent('damage')) {
        hit.play();
      }
    });

    getLocalPlayer(entities)
    .forEach(({id}) => {
      this.mediator.triggered(`collision:${id}`)
      .filter(R.prop('hitBy'))
      .forEach((e) => {
        var hitBy = entities.get(e.hitBy);

        if(hitBy.hasComponent('powerup')) {
          powerup.play();
        }
      });
    });
  }
}

module.exports = Sound;
