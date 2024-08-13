const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const dotEnv = require('dotenv')
const {Message}=require('./utils/message')

const app = express()
dotEnv.config({ path: './config.env' })

const Server = http.createServer(app)
const io = socketIO(Server);

app.get('/', (req, res) => {
    res.send(`Hey! This is Express's ChatApp running ....`)
});





io.on('connection', (socket) => { //connection established !!!! 
    console.log('Client connected!') 
    
    io.emit('broadcastMessage', Message('Admin', "Admin is active!"))

    socket.on('newMessage', (message) => {   //message from the client 
        console.log(`Message from client:`,'\n','summary', message) 
    })

    socket.emit('replyMessage',Message('Server','Server is active and listening !!!! ')) //reply to client !!!! 
   
    // socket.broadcast.emit('broadCast',Message('Admin',"Admin is active ! "))
    // socket.broadcast.emit('broadcastMessage', Message('Admin', "Admin is active!"));

 

    socket.on('disconnect', () => { 
        console.log('Client disconnected')
    })
})

Server.listen(process.env.PORT, () => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`Server is running on port ${process.env.PORT} in development mode.`)
    } else {
        console.log(`Server is running on port ${process.env.PORT} in production mode.`)
    }
});
