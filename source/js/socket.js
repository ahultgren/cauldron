'use strict';

var EventEmitter = require('events').EventEmitter;

class Socket extends EventEmitter {
  static create (uri) {
    return new Socket(uri);
  }

  constructor (uri) {
    super();
    this.uri = uri;
    this.connect();
  }

  connect () {
    this.socket = new WebSocket(this.uri);

    this.socket.onmessage = (e) => {
      var message = JSON.parse(e.data);
      this.emit(message.type, message.message);
    };
    this.socket.onopen = () => {
      console.log('Socket connected');
      this.emit('open');
    };
    this.socket.onclose = () => {
      console.log('Socket closed');
      this.emit('close');
    };
  }

  send (type, data = {}) {
    this.socket.send(JSON.stringify({
      type,
      data,
    }));
  }
}

module.exports = Socket;
