'use strict';

module.exports = function (canvas) {
  return [
    // Border
    [{x:0,y:0}, {x:canvas.width,y:0}],
    [{x:canvas.width,y:0}, {x:canvas.width,y:canvas.height}],
    [{x:canvas.width,y:canvas.height}, {x:0,y:canvas.height}],
    [{x:0,y:canvas.height}, {x:0,y:0}],

    // Polygon #1
    [{x:140,y:130}, {x:120,y:50}],
    [{x:120,y:50}, {x:200,y:80}],
    [{x:200,y:80}, {x:140,y:210}],
    [{x:140,y:210}, {x:140,y:130}],

    // Polygon #2
    [{x:100,y:200}, {x:120,y:250}],
    [{x:120,y:250}, {x:60,y:300}],
    [{x:60,y:300}, {x:100,y:200}],

    // Polygon #3
    [{x:200,y:260}, {x:220,y:150}],
    [{x:220,y:150}, {x:300,y:200}],
    [{x:300,y:200}, {x:350,y:320}],
    [{x:350,y:320}, {x:200,y:260}],

    // Polygon #4
    [{x:540,y:60}, {x:560,y:40}],
    [{x:560,y:40}, {x:570,y:70}],
    [{x:570,y:70}, {x:540,y:60}],

    // Polygon #5
    [{x:650,y:190}, {x:760,y:170}],
    [{x:740,y:270}, {x:630,y:290}],
    [{x:630,y:290}, {x:650,y:190}],

    // Polygon #6
    [{x:600,y:95}, {x:780,y:50}],
    [{x:780,y:50}, {x:680,y:150}],
    [{x:680,y:150}, {x:600,y:95}],

    // Testing
    [{x:400,y:100}, {x:400,y:200}],
    [{x:400,y:150}, {x:500,y:150}]
  ];
};
