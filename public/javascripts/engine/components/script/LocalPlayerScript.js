'use strict';

var util = require('util');
var Component = require('../Component');


var Script = module.exports = function LocalPlayerScript (settings) {
  this.constructor.super_.call(this, {}, settings);
};

util.inherits(Script, Component);


Script.prototype.init = function(entity) {
  entity.input.on('mousedown', this.triggerStart_.bind(this, entity));
  entity.input.on('mouseup', this.triggerEnd_.bind(this, entity));
};

Script.prototype.update = function() {
};



/* Private
============================================================================= */

Script.prototype.triggerStart_ = function(entity) {
  var from, toward, spread;

  if(entity.weapon) {
    from = entity;
    toward = entity.input.mouse;
    spread = entity.weapon.spread;

    entity.weapon.script.triggerStart(from, toward, spread);

    /*entity.emit('action', 'triggerStart', {
      from: {
        x: from.x,
        y: from.y
      },
      toward: {
        x: toward.x,
        y: toward.y
      },
      spread: spread
    });*/
  }
};


Script.prototype.triggerEnd_ = function(entity) {
  if(entity.weapon) {
    entity.weapon.script.triggerEnd();

    /*entity.emit('action', 'triggerEnd');*/
  }
};
