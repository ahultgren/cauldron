'use strict';

class PointerFollower {
  static create (camera) {
    return new PointerFollower(camera);
  }

  constructor (camera) {
    this.camera = camera;
    this.mouseX = 0;
    this.mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
    }, false);
  }

  tick (entities) {
    entities.forEach((entity) => {
      if(!entity.hasComponents('pointerFollower', 'position')) {
        return;
      }

      var position = entity.getComponent('position');

      position.x = this.mouseX - this.camera.x;
      position.y = this.mouseY - this.camera.y;
    });
  }
}

module.exports = PointerFollower;
