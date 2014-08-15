'use strict';

var util = require('util');
var utils = require('../../utils');
var Component = require('../Component');


var Graphics = module.exports = function RocketGraphics (settings) {
  this.constructor.super_.call(this, {}, settings);
};

util.inherits(Graphics, Component);


Graphics.prototype.type_ = 'masked';

Graphics.prototype.draw = function(entity, ctx) {
  //## entity.shape or maybe entity.spatial should be a good place to store geometrical data for all entities? Even collision-testing should be able to use it
  utils.drawPolygon(entity.data.path, ctx, entity.data.fill);
};
