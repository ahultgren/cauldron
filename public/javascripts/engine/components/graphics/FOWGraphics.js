'use strict';

var util = require('util');
var utils = require('../../utils');
var Component = require('../Component');


var Graphics = module.exports = function FOWGraphics (settings) {
  this.constructor.super_.call(this, {
    fuzzyRadius: 10
  }, settings);

  this.uniquePoints = calculateUniquePoints(this.paths);
};

util.inherits(Graphics, Component);

Graphics.create = function (settings) {
  return new Graphics(settings);
};


Graphics.prototype.type_ = 'visibilityPolygons';

Graphics.prototype.draw = function(entity, ctx) {
  var angle, dx, dy;
  var polygons = [
    getSightPolygon(this.paths, this.uniquePoints, this.player.data.x, this.player.data.y)
  ];

  for(angle = 0; angle < Math.PI*2; angle += (Math.PI*2)/3.1){
    dx = Math.cos(angle)*this.fuzzyRadius;
    dy = Math.sin(angle)*this.fuzzyRadius;

    polygons.push(
      getSightPolygon(this.paths, this.uniquePoints, this.player.data.x+dx, this.player.data.y+dy)
    );
  }

  // DRAW AS A GIANT POLYGON
  for(var i=1;i<polygons.length;i++){
    utils.drawPolygon(polygons[i], ctx, 'rgba(255,255,255,0.2)');
  }

  utils.drawPolygon(polygons[0], ctx, '#fff');
};


/* Helpers
============================================================================= */

function getSightPolygon (paths, uniquePoints, sightX, sightY) {
  // Get all angles
  var uniqueAngles = [];
  var angle;
  var j;

  for(j=0;j<uniquePoints.length;j++){
    var uniquePoint = uniquePoints[j];
    angle = Math.atan2(uniquePoint.y-sightY,uniquePoint.x-sightX);
    uniquePoint.angle = angle;
    uniqueAngles.push(angle-0.00001,angle,angle+0.00001);
  }

  // RAYS IN ALL DIRECTIONS
  var intersects = [];
  for(j=0;j<uniqueAngles.length;j++){
    angle = uniqueAngles[j];

    // Calculate dx & dy from angle
    var dx = Math.cos(angle);
    var dy = Math.sin(angle);

    // Ray from center of screen to mouse
    var ray = [
      {x: sightX,y: sightY},
      {x: sightX + dx,y: sightY + dy}
    ];

    // Find CLOSEST intersection
    var closestIntersect = null;
    for(var i=0;i<paths.length;i++){
      var intersect = utils.getIntersection(ray,paths[i]);
      if(!intersect) { continue; }
      if(!closestIntersect || intersect.param<closestIntersect.param){
        closestIntersect=intersect;
      }
    }

    // Intersect angle
    if(!closestIntersect) { continue; }
    closestIntersect.angle = angle;

    // Add to list of intersects
    intersects.push(closestIntersect);

  }

  // Sort intersects by angle
  intersects = intersects.sort(function(a,b){
    return a.angle-b.angle;
  });

  // Polygon is intersects, in order of angle
  return intersects;
}

function calculateUniquePoints (paths) {
  //## Is it possible to use a Set here?
  var set = {};
  var points = paths.reduce(function(points, seg){
    points.push(seg[0], seg[1]);
    return points;
  }, []);

  return points.filter(function(p){
    var key = p.x+','+p.y;

    if(key in set) {
      return false;
    }
    else {
      set[key] = true;
      return true;
    }
  });
}
