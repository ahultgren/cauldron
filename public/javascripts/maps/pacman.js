'use strict';

var GRID_SIZE = 30;

module.exports = function () {
  var map = [
    // Top row
    [{x:2,y:2}, {x:5,y:2}],
    [{x:5,y:2}, {x:5,y:4}],
    [{x:5,y:4}, {x:2,y:4}],
    [{x:2,y:4}, {x:2,y:2}],

    [{x:7,y:2}, {x:11,y:2}],
    [{x:11,y:2}, {x:11,y:4}],
    [{x:11,y:4}, {x:7,y:4}],
    [{x:7,y:4}, {x:7,y:2}],

    [{x:14,y:0}, {x:14,y:4}],
    [{x:14,y:4}, {x:13,y:4}],
    [{x:13,y:4}, {x:13,y:0}],

    [{x:16,y:2}, {x:20,y:2}],
    [{x:20,y:2}, {x:20,y:4}],
    [{x:20,y:4}, {x:16,y:4}],
    [{x:16,y:4}, {x:16,y:2}],

    [{x:22,y:2}, {x:25,y:2}],
    [{x:25,y:2}, {x:25,y:4}],
    [{x:25,y:4}, {x:22,y:4}],
    [{x:22,y:4}, {x:22,y:2}],

    // Second row
    [{x:2,y:6}, {x:5,y:6}],
    [{x:5,y:6}, {x:5,y:7}],
    [{x:5,y:7}, {x:2,y:7}],
    [{x:2,y:7}, {x:2,y:6}],

    [{x:22,y:6}, {x:25,y:6}],
    [{x:25,y:6}, {x:25,y:7}],
    [{x:25,y:7}, {x:22,y:7}],
    [{x:22,y:7}, {x:22,y:6}],

    // "Three T's" |- T -|
    [{x:7,y:6}, {x:7,y:13}],
    [{x:7,y:9.5}, {x:11,y:9.5}],

    [{x:10,y:6}, {x:17,y:6}],
    [{x:13.5,y:6}, {x:13.5,y:10}],

    [{x:20,y:6}, {x:20,y:13}],
    [{x:20,y:9.5}, {x:16,y:9.5}],

    // Center box
    [{x:10,y:12}, {x:12,y:12}],
    [{x:15,y:12}, {x:17,y:12}],
    [{x:10,y:12}, {x:10,y:16}],
    [{x:17,y:12}, {x:17,y:16}],
    [{x:10,y:16}, {x:17,y:16}],

    // Exits
    [{x:0,y:9}, {x:5,y:9}],
    [{x:5,y:9}, {x:5,y:13}],
    [{x:0,y:13}, {x:5,y:13}],

    [{x:0,y:15}, {x:5,y:15}],
    [{x:5,y:15}, {x:5,y:19}],
    [{x:0,y:19}, {x:5,y:19}],

    [{x:27,y:9}, {x:22,y:9}],
    [{x:22,y:9}, {x:22,y:13}],
    [{x:27,y:13}, {x:22,y:13}],

    [{x:27,y:15}, {x:22,y:15}],
    [{x:22,y:15}, {x:22,y:19}],
    [{x:27,y:19}, {x:22,y:19}],

    // | T |
    [{x:7,y:15}, {x:7,y:19}],

    [{x:10,y:19}, {x:17,y:19}],
    [{x:13.5,y:19}, {x:13.5,y:22}],

    [{x:20,y:15}, {x:20,y:19}],

    // Second last row
    [{x:2,y:21}, {x:5,y:21}],
    [{x:5,y:21}, {x:5,y:25}],
    [{x:4,y:25}, {x:5,y:25}],
    [{x:4,y:25}, {x:4,y:22}],
    [{x:2,y:22}, {x:4,y:22}],
    [{x:2,y:21}, {x:2,y:22}],

    [{x:25,y:21}, {x:22,y:21}],
    [{x:22,y:21}, {x:22,y:25}],
    [{x:23,y:25}, {x:22,y:25}],
    [{x:23,y:25}, {x:23,y:22}],
    [{x:25,y:22}, {x:23,y:22}],
    [{x:25,y:21}, {x:25,y:22}],

    [{x:7,y:21}, {x:11,y:21}],
    [{x:11,y:22}, {x:11,y:21}],
    [{x:7,y:22}, {x:11,y:22}],
    [{x:7,y:22}, {x:7,y:21}],

    [{x:20,y:21}, {x:16,y:21}],
    [{x:16,y:22}, {x:16,y:21}],
    [{x:20,y:22}, {x:16,y:22}],
    [{x:20,y:22}, {x:20,y:21}],

    // Last row ___|__ T __|___
    [{x:2,y:27}, {x:11,y:27}],
    [{x:7,y:27}, {x:7,y:24}],

    [{x:10,y:24}, {x:17,y:24}],
    [{x:13.5,y:24}, {x:13.5,y:27}],

    [{x:25,y:27}, {x:16,y:27}],
    [{x:20,y:27}, {x:20,y:24}],

  ];

  map.forEach(function (segment) {
    segment.forEach(function (point) {
      point.x = point.x * GRID_SIZE;
      point.y = point.y * GRID_SIZE;
    });
  });

  map.width = GRID_SIZE * 27;
  map.height = GRID_SIZE * 29;

  map.playerSpawnPoints = [
    {
      x: 13 * GRID_SIZE,
      y: 23 * GRID_SIZE
    },
    {
      x: 14 * GRID_SIZE,
      y: 23 * GRID_SIZE
    },
    {
      x: 12 * GRID_SIZE,
      y: 23 * GRID_SIZE
    },
    {
      x: 15 * GRID_SIZE,
      y: 23 * GRID_SIZE
    }
  ];

  map.powerupSpawnPoints = [
    {
      x: 1 * GRID_SIZE,
      y: 3 * GRID_SIZE,
      powerupType: 'weapon',
      powerupData: 'PlasmaRifle'
    },
    {
      x: 26 * GRID_SIZE,
      y: 3 * GRID_SIZE,
      powerupType: 'weapon',
      powerupData: 'PlasmaRifle'
    },
    {
      x: 1 * GRID_SIZE,
      y: 23 * GRID_SIZE,
      powerupType: 'weapon',
      powerupData: 'PlasmaRifle'
    },
    {
      x: 26 * GRID_SIZE,
      y: 23 * GRID_SIZE,
      powerupType: 'weapon',
      powerupData: 'PlasmaRifle'
    }
  ];

  map.color = '#00f';

  return map;
};
