"use strict";

var http = require('http');
var express = require('express');
var socketIo = require('socket.io');

var port = process.env.PORT || 5000;

var app = express();
var server = http.Server(app);
var io = socketIo(server);

app.use(express.static('frontend'));

server.listen(port, function() {
  console.log('App listening on port', port);
});

io.on('connection', function(socket) {
  socket.emit('test', {
    test: "Hello."
  });
});
