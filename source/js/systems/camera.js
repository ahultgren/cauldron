'use strict';

var find = require('../utils/findMap');

const MAP_OVERFLOW = 100;

class Camera {
  static create (canvas) {
    return new Camera(canvas);
  }

  constructor (canvas) {
    this.canvas = canvas;
    this.x = 0;
    this.y = 0;
  }

  tick (entities) {
    var target = find(entity => entity.hasComponent('cameraTarget'), entities);
    var map = find(entity => entity.hasComponent('cameraBounds'), entities);

    var targetPos = target.getComponent('position');
    var bounds = map.getComponent('cameraBounds');

    this.x = this.canvas.width / 2 - targetPos.x;
    this.y = this.canvas.height / 2 - targetPos.y;

    this.clamp(bounds);
  }

  clamp (bounds) {
    var maxX = this.canvas.width - bounds.width - MAP_OVERFLOW;
    var maxY = this.canvas.height - bounds.height - MAP_OVERFLOW;

    if(this.canvas.width > bounds.width) {
      this.x = (maxX + MAP_OVERFLOW) / 2;
    }
    else if(this.x > MAP_OVERFLOW) {
      this.x = MAP_OVERFLOW;
    }
    else if(this.x < maxX) {
      this.x = maxX;
    }

    if(this.canvas.height > bounds.height) {
      this.y = (maxY + MAP_OVERFLOW) / 2;
    }
    else if(this.y > MAP_OVERFLOW) {
      this.y = MAP_OVERFLOW;
    }
    else if(this.y < maxY) {
      this.y = maxY;
    }
  }
}

module.exports = Camera;
