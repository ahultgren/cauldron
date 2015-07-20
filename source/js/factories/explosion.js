'use strict';

var Entity = require('../entity');
var position = require('../components/position');
var appearance = require('../components/appearance');
var animation = require('../components/animation');
var expire = require('../components/expire');

module.exports = (source) => {
  var bulletPosition = source.getComponent('position');
  var explosion = Entity.create();
  explosion.addComponent(position({
    x: bulletPosition.x,
    y: bulletPosition.y,
  }));
  explosion.addComponent(appearance({
    shape: 'arc',
    radius: 35,
    fill: '#f90',
  }));
  explosion.addComponent(animation({
    duration: 10,
  }));
  explosion.addComponent(expire({
    duration: 10,
  }));
  return explosion;
};
