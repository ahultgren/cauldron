'use strict';

var util = require('util');
var Component = require('../Component');
var gradient = [
  '#f60',
  '#f84',
  '#f97',
  '#fba',
  '#fdb',
  '#ffc',
  '#fff'
];


var Graphics = module.exports = function BallGraphics (settings) {
  this.constructor.super_.call(this, {
    currentGradient: 0
  }, settings);
};

util.inherits(Graphics, Component);


Graphics.prototype.draw = function(entity, ctx) {
  if(entity.physics.collided) {
    entity.radius += 1;
    entity.fill = gradient[this.currentGradient++];
  }

  this.drawBall(entity, ctx);
};

Graphics.prototype.drawBall = function(entity, ctx) {
  ctx.beginPath();
  ctx.arc(entity.x, entity.y, entity.radius, 0, Math.PI * 2);
  ctx.fillStyle = entity.fill;
  ctx.fill();
};
