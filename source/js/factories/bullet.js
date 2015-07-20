'use strict';

var Entity = require('../entity');
var position = require('../components/position');
var physics = require('../components/physics');
var appearance = require('../components/appearance');
var collision = require('../components/collision');
var factory = require('../components/factory');

module.exports = (source) => {
  var playerFactory = source.getComponent('factory');
  var playerPosition = source.getComponent('position');
  var bullet = Entity.create();
  var bulletPosition = position(playerPosition);
  var radius = 5;

  // [TODO] Make relative to player size and bullet size
  bulletPosition.x += radius * Math.cos(playerPosition.a);
  bulletPosition.y += radius * Math.sin(playerPosition.a);

  bullet.addComponent(bulletPosition);
  bullet.addComponent(physics({
    dx: (playerFactory.data.speed || 5) * Math.cos(playerPosition.a),
    dy: (playerFactory.data.speed || 5) * Math.sin(playerPosition.a),
  }));
  bullet.addComponent(appearance({
    shape: 'arc',
    radius,
  }));
  bullet.addComponent(collision.fromArc({
    response: 'die',
    radius,
  }));
  bullet.addComponent(factory({
    event: `collision:${bullet.id}`,
    factory: 'explosion',
    data: {},
  }));

  return bullet;
};
