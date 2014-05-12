'use strict';

var keys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  87: 'w',
  65: 'a',
  83: 's',
  68: 'd'
};

var keyboard = module.exports = {
  isPressed: function (key) {
    return this[key];
  }
};

window.addEventListener('keydown', function (e) {
  keyboard[keys[e.which] || e.which] = true;
}, false);

window.addEventListener('keyup', function (e) {
  keyboard[keys[e.which] || e.which] = false;
}, false);
