'use strict';

var find = require('cauldron-core/app/utils/findMap');
var leaderboard = document.querySelector('.js-leaderboard');

exports.show = (game, {results}, join) => {
  var localPlayer = find(entity => entity.hasComponent('keyboardControlled'), game.entities);
  var text = localPlayer.id === results[0].id ? 'You won!' : 'You did not win :(';

  leaderboard.innerHTML = text;
  leaderboard.classList.remove('u-hidden');

  var onClick = () => {
    exports.hide();
    join();
    leaderboard.removeEventListener('click', onClick, false);
  };

  leaderboard.addEventListener('click', onClick, false);
};

exports.hide = () => {
  leaderboard.classList.add('u-hidden');
};
