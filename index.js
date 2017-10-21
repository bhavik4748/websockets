var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4000, function () {
    console.log('listening to port 4000  ');

});

//static files
app.use(express.static('public'));

//Socket set up
var io = socket(server);

io.on('connection', function (socket) {
    console.log('socket connection made:' + socket.id);

    socket.on('chat', function (data) {
        io.sockets.emit('chat', data);
        console.log('chat', data);
    });

    socket.on('typings', function (data) {
        socket.broadcast.emit('typings', data.handle);
        console.log('typings', data.handle);
    });
});
