const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const server_settings_service = require('./server.settings');

const public_path = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app); // or let server = http.createServer((req, res) => {});
let io = socketIO(server);

app.use(express.static(public_path));
app.use(server_settings_service.log_url);

io.on('connection', (socket) => {
    console.log('New user connected');

    let body = {
        from: 'mike@emaple.com',
        text: 'Hey, I like pie',
        created_at: new Date().toISOString()
    };

    // emitter
    socket.emit('new_message', body);

    // listener
    socket.on('create_message', (message) => {
        console.log('Create message', message);
        let update_message = {
            from: message.from,
            text: message.text,
            created_at: new Date().toISOString()
        };
        io.emit('new_message', update_message);
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