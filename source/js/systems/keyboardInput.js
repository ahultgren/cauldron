'use strict';

var controllable = entity => entity.hasComponents('keyboardControlled', 'physics');

class KeyboardInput {
  static create () {
    return new KeyboardInput();
  }

  constructor () {
    this.isPressed = {};

    window.addEventListener('keydown', (e) => {
      this.isPressed[e.which] = true;
    }, false);

    window.addEventListener('keyup', (e) => {
      this.isPressed[e.which] = false;
    }, false);
  }

  tick (entities) {
    entities.forEach((entity) => {
      if(!controllable(entity)) {
        return;
      }

      var physics = entity.getComponent('physics');
      var keyboard = entity.getComponent('keyboardControlled');

      if(this.isPressed[keyboard.left]) {
        physics.dx -= physics.acceleration;
      }
      if(this.isPressed[keyboard.right]) {
        physics.dx += physics.acceleration;
      }
      if(this.isPressed[keyboard.up]) {
        physics.dy -= physics.acceleration;
      }
      if(this.isPressed[keyboard.down]) {
        physics.dy += physics.acceleration;
      }
    });
  }
}

module.exports = KeyboardInput;
