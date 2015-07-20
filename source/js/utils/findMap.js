'use strict';

module.exports = (fn, map) => {
  for(let item of map) { // eslint-ignore-line
    if(fn(item[1])) {
      return item[1];
    }
  }
};
