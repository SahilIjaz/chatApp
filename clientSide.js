const io = require('socket.io-client');
const socket = io('http://localhost:4000');

socket.on('connect', () => {
    console.log('Successfully connected to the server');
    
    socket.emit('newMessage', {
        from: "Client",
        message: 'I am a client ! '
    })
})

socket.on('replyMessage',(message)=>{
    console.log(`Message from ${message.from} is ${message.message}.`)
})

socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});
