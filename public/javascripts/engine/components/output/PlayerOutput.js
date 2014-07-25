'use strict';

//## This doesn't feel right. Will anything else than a player use output?

var util = require('util');
var Component = require('../Component');


var Output = module.exports = function PlayerOutput (settings) {
  this.constructor.super_.call(this, {}, settings);
  // this.network
};

util.inherits(Output, Component);


Output.prototype.init = function(entity) {
  var self = this;

  //## Can this be made more specific? Most importantly not listen on entity (so that entity is not an eventemitter)?
  entity.on('action', function (action, data) {
    self.network.outgoing.push({
      type: action,
      data: data
    });
  });
};

Output.prototype.updateEvent = function(entity) {
  //## Check if update is needed; Object.observe?
  this.network.outgoing.push({
    type: 'position',
    data: {
      x: entity.x,
      y: entity.y,
      a: entity.a
    }
  });
};
