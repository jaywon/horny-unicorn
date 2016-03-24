//CLIENT SERVER---------------------------------------------
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', (socket) => {
  console.log('connected', socket);

  socket.on('disconnect', function() {
    console.log('disconnected');
  });
});

http.listen(4000, () => {
    console.log('listening on *:4000');
});

//SOCKET SERVER-------------------------------------------------
const net = require('net');
const HOST = 'localhost';
const PORT = 6969;

net.createServer((sock) => {
  console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

  sock.on('data', (data) => {
    console.log(data.toString()); 
    io.emit('data', data.toString());
  });

  sock.on('close', (data) => {
    console.log('CLOSED: ' + `${sock.remoteAddress} ${sock.remotePort}`);
  });
}).listen(PORT, HOST);