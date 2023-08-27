const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS) from a 'public' directory
app.use(express.static('public'));

io.on('connection', (socket) => {
    // Handle new connections here
    console.log('A user connected');

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
    // Handle incoming chat messages
    socket.on('chat message', (message) => {
        // Broadcast the message to all connected clients
        io.emit('chat message', message);
    });
});


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
