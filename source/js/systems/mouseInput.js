'use strict';

class MouseInput {
  static create (camera) {
    return new MouseInput(camera);
  }

  constructor (camera) {
    this.camera = camera;
    this.mouseX = 0;
    this.mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
    }, false);

    window.addEventListener('mousedown', (e) => {
      this.mediator.emit('click', {
        x: e.pageX,
        y: e.pageY,
      });
    }, false);
  }

  tick (entities) {
    entities.forEach((entity) => {
      if(!entity.hasComponents('mouseControlled', 'position')) {
        return;
      }

      var position = entity.getComponent('position');

      position.a = Math.atan2(
        this.mouseY - position.y - this.camera.y,
        this.mouseX - position.x - this.camera.x
      );
    });
  }
}

module.exports = MouseInput;
