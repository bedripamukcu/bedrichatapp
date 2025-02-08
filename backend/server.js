const express= require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/chatapp')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST']
    }
});

let messages = [];

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.emit('initialMessages',messages);

    socket.on('sendMessage', (newMessage) => {
    messages.push(newMessage);
    io.emit('newMessage', newMessage)})
    socket.on('disconnect', () => {
    console.log('user disconnected');    
    })
    
})

app.get('/messages', (req, res) => {
 
    res.json(messages);
});

app.post('/messages', (req, res) => {

    const { text, sender } = req.body;
    const newMessage = { text, sender, timestamp: Date.now() };
    messages.push(newMessage);

    res.status(201).json(newMessage);
});

const PORT = 5000;

server.listen(PORT, () => {
    console.log((`Server running on port ${PORT}`));
    
})