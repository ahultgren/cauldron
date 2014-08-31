'use strict';

module.exports = function extend (rootObj) {
  var objs = Array.prototype.slice.call(arguments, 1);
  var i, l, obj, ii, ll, keys, key;

  for(i = 0, l = objs.length; i < l; i++) {
    obj = objs[i];

    if(obj) {
      keys = Object.keys(obj);

      for(ii = 0, ll = keys.length; ii < ll; ii++) {
        key = keys[ii];
        rootObj[key] = obj[key];
      }
    }
  }

  return rootObj;
};
