"use strict";

var net = require('net');
var http = require('http');
var express = require('express');
var socketIo = require('socket.io');

var port = process.env.PORT || 5000;
var mooHost = process.env.MOO_HOST || '127.0.0.1';
var mooPort = process.env.MOO_PORT;

var app = express();
var server = http.Server(app);
var io = socketIo(server);

app.use(express.static('frontend'));

server.listen(port, function() {
  console.log('App listening on port', port);
});

io.on('connection', function(socket) {
  var tcp = new net.Socket();

  tcp.connect(mooPort, mooHost);
  tcp.on('data', function(data) {
    socket.emit('output', data.toString());
  });
  tcp.on('close', function() {
    socket.disconnect();
  });

  socket.on('disconnect', function() {
    tcp.destroy();
  });
  socket.on('line', function(line) {
    tcp.write(line);
    tcp.write('\n');
  });
});
