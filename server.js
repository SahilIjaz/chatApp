const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const dotEnv = require('dotenv');
const app = express();

dotEnv.config({ path: './config.env' });

const Server = http.createServer(app);
const io = socketIO(Server);

app.get('/', (req, res) => {
    res.send(`Hey! This is Express's ChatApp running ....`);
});

io.on('connection', (socket) => {
    console.log('Client connected!')

    
    socket.on('newMessage', (message) => {
        console.log(`Message from client:`, message) 
    })

    io.emit('replyMessage',{
        from:'server',
        message:'Server is active and listening !'
    })

    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })
})

Server.listen(process.env.PORT, () => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`Server is running on port ${process.env.PORT} in development mode.`);
    } else {
        console.log(`Server is running on port ${process.env.PORT} in production mode.`);
    }
});
