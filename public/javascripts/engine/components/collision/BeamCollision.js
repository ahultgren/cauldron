'use strict';

var util = require('util');
var Component = require('../Component');
var Entity = require('../Entity');
var ExplosionGraphics = require('../graphics/ExplosionGraphics');


var Collision = module.exports = function BeamCollision (settings) {
  this.constructor.super_.call(this, {
    explosionRadius: 2,
    explosionDuration: 4,
    explosionGradient: [
      '#f00',
      '#f77',
      '#faa',
      '#fcc',
      '#fff'
    ]
  }, settings);
};

util.inherits(Collision, Component);


Collision.prototype.type_ = 'obstacle';
Collision.prototype.response_ = 'none';
Collision.prototype.boundingBox_ = 'polygon';

Collision.prototype.update = function() {};

Collision.prototype.onCollision = function(entity, type, target) {
  switch(type) {
    case 'map':
      //## Spawn small explosion?
      break;

    case 'collidable':
      if(target.weapon !== entity.weapon) {
        //## Need point of collision
        this.spawn_(entity, target);
      }
      break;
  }
};


/* Private
============================================================================= */

Collision.prototype.spawn_ = function(entity, target) {
  this.game.add(new Entity({}, {
    graphics: new ExplosionGraphics({
      gradient: this.explosionGradient,
      duration: this.explosionDuration
    })
  }, {
    x: target.data.x,
    y: target.data.y,
    radius: this.explosionRadius
  }));
};

