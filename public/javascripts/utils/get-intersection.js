'use strict';

module.exports = function getIntersection (ray, segment) {
  // RAY in parametric: Point + Delta*T1
  var rPx = ray.a.x;
  var rPy = ray.a.y;
  var rDx = ray.b.x-ray.a.x;
  var rDy = ray.b.y-ray.a.y;

  // SEGMENT in parametric: Point + Delta*T2
  var sPx = segment.a.x;
  var sPy = segment.a.y;
  var sDx = segment.b.x-segment.a.x;
  var sDy = segment.b.y-segment.a.y;

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
