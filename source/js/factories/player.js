'use strict';

var Entity = require('../entity');
var positionComponent = require('../components/position');
var physicsComponent = require('../components/physics');
var appearanceComponent = require('../components/appearance');
var collisionComponent = require('../components/collision');

module.exports = ({
  position = {
    x: 200,
    y: 50,
  },
  appearance = {
    shape: 'arc',
    radius: 10,
    gap: Math.PI * 0.25,
    segment: true,
  },
  physics = {
    acceleration: 2.5,
    friction: 0.65,
  },
  collision = {
    radius: 10,
  },
} = {}) => {
  var player = Entity.create();

  player.addComponent(positionComponent(position));
  player.addComponent(appearanceComponent(appearance));
  player.addComponent(physicsComponent(physics));
  player.addComponent(collisionComponent.fromArc(collision));

  return player;
};
