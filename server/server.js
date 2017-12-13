const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {log_url} = require('./server.settings');
const {generate_message} = require('./utils/message');

const public_path = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app); // or let server = http.createServer((req, res) => {});
let io = socketIO(server);

app.use(express.static(public_path));
app.use(log_url);

io.on('connection', (socket) => {
    console.log('New user connected');

    let welcome_body = generate_message('admin', 'Welcome to the chat app');

    // emitter to current socket
    socket.emit('new_message', welcome_body);

    let bc_welcome_body = generate_message('admin', 'A new user has joined');

    // global emitter except for current socket
    socket.broadcast.emit('new_message', bc_welcome_body);

    // listener
    socket.on('create_message', (message, callback) => {
        console.log('Create message', message);
        let update_message = generate_message(message.from, message.text);

        // global emitter
        io.emit('new_message', update_message);
        callback({text: 'this is from the server'});

        // socket.broadcast.emit('new_message', update_message);
    });

    // listener
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});



app.get('/', (req, res) => {
    res.send('App up and running');
});

server.listen(PORT, () => {
    console.log(`Express app started successfully on port ${PORT}`);
});