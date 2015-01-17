'use strict';

var utils = require('../../utils');
var Graphics = module.exports = exports;

Graphics.create = function () {
  return Graphics;
};

Graphics.init = function(entity) {
  entity.data.fuzzyRadius = entity.data.fuzzyRadius || 10;
  entity.data.uniquePoints = calculateUniquePoints(entity.data.paths);
};

Graphics.update = function(entity, ctx) {
  var polygon = getSightPolygon(entity.data.paths, entity.data.uniquePoints, entity.data.player.data.x, entity.data.player.data.y);

  utils.drawPolygon(polygon, ctx, '#fff');
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
