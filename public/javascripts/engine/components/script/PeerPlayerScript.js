'use strict';

var util = require('util');
var Component = require('../Component');


var Script = module.exports = function PeerPlayerScript (settings) {
  this.constructor.super_.call(this, {}, settings);
};

util.inherits(Script, Component);


Script.prototype.init = function(entity) {
  entity.input.on('triggerStart', this.triggerStart.bind(this, entity));
  entity.input.on('triggerEnd', this.triggerEnd.bind(this, entity));
};

Script.prototype.update = function(entity) {
  void(entity);
};

Script.prototype.triggerStart = function(entity, settings) {
  var from, toward, spread;

  if(entity.weapon) {
    from = settings.from || entity;
    toward = settings.toward;
    spread = settings.spread || entity.weapon.spread;

    entity.weapon.script.triggerStart(from, toward, spread);
  }
};


Script.prototype.triggerEnd = function(entity) {
  if(entity.weapon) {
    entity.weapon.script.triggerEnd();
  }
};
