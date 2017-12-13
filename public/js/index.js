var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    // var body = {
    //     from: 'jen@example.com',
    //     text: 'I prefer burgers'
    // };
    //
    // // emitter
    // socket.emit('create_message', body);
});

socket.on('disconnect', function() {
    console.log('Disconnecting from server');
});

// listener
socket.on('new_message', function(message) {
    console.log('New message', message);
});