const io = require('socket.io-client')
const socket = io('http://localhost:4000')
const {Message}=require('./utils/message')

socket.on('connect', () => {
    console.log('Successfully connected to the server')
socket.emit('newMessage', Message('Client',"Connected to the server .... successfylly ! ")) //Initial message to server !!! 
})
socket.on('replyMessage',(message)=>{
    console.log(`Message from ${message.from} is ${message.message}.`,'\n','summary',message)
    console.log('------------------------------------------------------------------')
})

socket.on('broadcastMessage',function(message){console.log(`Message from ${message.from}`,message)})

socket.on('disconnect', () => {
    console.log('Disconnected from the server')
});
