'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;


var Mouse = function () {
  var self = this;

  this.camera = {
    x: 0,
    y: 0
  };

  this.x = 0;
  this.y = 0;

  window.addEventListener('mousemove', function (e) {
    self.mouseX = e.pageX;
    self.mouseY = e.pageY;
  }, false);

  window.addEventListener('mousedown', this.emit.bind(this, 'mousedown'), false);
  window.addEventListener('mouseup', this.emit.bind(this, 'mouseup'), false);
};

util.inherits(Mouse, EventEmitter);


Mouse.prototype.update = function() {
  this.x = this.mouseX - this.camera.x;
  this.y = this.mouseY - this.camera.y;
};

Mouse.prototype.correct = function(camera) {
  this.camera = camera;
};


module.exports = new Mouse();
