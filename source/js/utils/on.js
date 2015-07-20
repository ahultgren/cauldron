'use strict';

module.exports = (elem, event, selector, callback) => {
  elem.addEventListener(event, (e) => {
    if(e.target.matches(selector)) {
      callback(e);
    }
  }, false);
};
