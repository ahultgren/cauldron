'use strict';

module.exports = function extend (rootObj) {
  var objs = Array.prototype.slice.call(arguments, 1);

  objs.forEach(function (obj) {
    if(obj) {
      Object.keys(obj).forEach(function (i) {
        rootObj[i] = obj[i];
      });
    }
  });

  return rootObj;
};
