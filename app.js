'use strict';

var express = require('peer/node_modules/express');
var ExpressPeerServer = require('peer').ExpressPeerServer;
var app = express();
var port = process.env.PORT || 3000;
var server;

server = app.listen(port, function () {
  console.log('Listening on port %s', port);
});

app.use(express.static(__dirname + '/public'));
app.use(new ExpressPeerServer(server, {
  port: port,
  'allow_discovery': true
}));

//## .on('connection') could be used here to connect clients automatically
//## or implement own socket-solution for creating games (might be easier)
