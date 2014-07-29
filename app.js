'use strict';

var restify = require('peer/node_modules/restify');
var port = process.env.PORT || 3000;
var PeerServer = require('peer').PeerServer;
var peerServer = new PeerServer({
  port: port,
  path: '/peers'
});

console.log('Listening on port %s', port);

//## .on('connection') could be used here to connect clients automatically
//## or implement own socket-solution for creating games (might be easier)


/* Static files
============================================================================= */

peerServer._app.get(/.*/, restify.serveStatic({
  directory: 'public',
  default: 'index.html'
}));
