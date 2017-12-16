const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {log_url} = require('./server.settings');
const {generate_message, generate_location_message} = require('./utils/message');
const {is_real_string} = require('./utils/validation');
const {Users} = require('./utils/users');

const public_path = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app); // or let server = http.createServer((req, res) => {});
let io = socketIO(server);
let users = new Users();

app.use(express.static(public_path));
app.use(log_url);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if(!is_real_string(params.name) || !is_real_string(params.room)) {
            return callback('Name and room name are required');
        }

        // join a room
        socket.join(params.room);
        // socket.leave(params.room);
        users.remove_user(socket.id);
        users.add_user(socket.id, params.name, params.room);

        io.to(params.room).emit('update_user_list', users.get_user_list(params.room));

        // to a room
        // io.emit -> io.to('room name').emit   => to all users (in that room)
        // socket.broadcast.emit -> socket.broadcast.to('room name').emit   => to all users except user sending message (in that room)
        // socket.emit -> socket.emit   => to that specific user

        // emitter to current socket
        let welcome_body = generate_message('Admin', 'Welcome to the chat app');
        socket.emit('new_message', welcome_body);

        // global emitter except for current socket
        let bc_welcome_body = generate_message('Admin', `${params.name} has joined`);
        socket.broadcast.to(params.room).emit('new_message', bc_welcome_body);

        callback();
    });

    // listener
    socket.on('create_message', (message, callback) => {
        let update_message = generate_message(message.from, message.text);

        // global emitter
        io.emit('new_message', update_message);
        callback({text: 'server received'});

        // socket.broadcast.emit('new_message', update_message);
    });

    // listener
    socket.on('create_location_message', (coords) => {
        let location_message = generate_location_message('location', coords.latitude, coords.longitude);

        // global emitter
        io.emit('new_location_message', location_message);
    });

    // listener
    socket.on('disconnect', () => {
        console.log('User disconnected');
        let user = users.remove_user(socket.id);

        if (user) {
            io.to(user.room).emit('update_user_list', users.get_user_list(user.room));
            io.to(user.room).emit('new_message', generate_message('Admin', `${user.name} has left.`));
        }
    });

});



app.get('/', (req, res) => {
    res.send('App up and running');
});

server.listen(PORT, () => {
    console.log(`Express app started successfully on port ${PORT}`);
});