var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    bodyParser = require('body-parser'),
    path = require('path');


app.use('/public', express.static(__dirname + '/public'));



app.get('/receiver', function(req, res){
  res.sendFile(__dirname + '/receiver.html');
});

app.get('/transmitter', function(req, res){
  res.sendFile(__dirname + '/transmitter.html');
});

io.on('connection', function(socket){
  io.emit('notification', 'New user connected');
  socket.on('toCast', function(msg){
    io.emit('videoUrl', msg);
  });
  socket.on('playerCommand', function(cmd){
    console.log(cmd);
    io.emit('playerCommand', cmd);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
