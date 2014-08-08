'use strict';

module.exports = function getIntersection (ray, segment) {
  // RAY in parametric: Point + Delta*T1
  var rPx = ray[0].x;
  var rPy = ray[0].y;
  var rDx = ray[1].x-ray[0].x;
  var rDy = ray[1].y-ray[0].y;

  // SEGMENT in parametric: Point + Delta*T2
  var sPx = segment[0].x;
  var sPy = segment[0].y;
  var sDx = segment[1].x-segment[0].x;
  var sDy = segment[1].y-segment[0].y;

  // Are they parallel? If so, no intersect
  var rMag = Math.sqrt(rDx*rDx+rDy*rDy);
  var sMag = Math.sqrt(sDx*sDx+sDy*sDy);
  if(rDx/rMag === sDx/sMag && rDy/rMag === sDy/sMag){
    // Unit vectors are the same.
    return null;
  }

  // SOLVE FOR T1 & T2
  // rPx+rDx*T1 = sPx+sDx*T2 && rPy+rDy*T1 = sPy+sDy*T2
  // ==> T1 = (sPx+sDx*T2-rPx)/rDx = (sPy+sDy*T2-rPy)/rDy
  // ==> sPx*rDy + sDx*T2*rDy - rPx*rDy = sPy*rDx + sDy*T2*rDx - rPy*rDx
  // ==> T2 = (rDx*(sPy-rPy) + rDy*(rPx-sPx))/(sDx*rDy - sDy*rDx)
  var T2 = (rDx*(sPy-rPy) + rDy*(rPx-sPx))/(sDx*rDy - sDy*rDx);
  var T1 = (sPx+sDx*T2-rPx)/rDx;

  // Must be within parametic whatevers for RAY/SEGMENT
  if(T1<0) {
    return null;
  }
  if(T2<0 || T2>1) {
    return null;
  }

  // Return the POINT OF INTERSECTION
  return {
    x: rPx+rDx*T1,
    y: rPy+rDy*T1,
    param: T1
  };
};
