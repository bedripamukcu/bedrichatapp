const express= require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const messages = [];

app.get('/messages', (req, res) => {
    console.log("GET /messages hit!");
    console.log('Fetching all messages');
    res.json(messages);
});

app.post('/messages', (req, res) => {
    console.log("POST /messages hit!");
    console.log('New message received:', req.body);

    const { text, sender } = req.body;
    const newMessage = { text, sender, timestamp: Date.now() };

    messages.push(newMessage);
    console.log('Updated Messages:', messages);

    res.status(201).json(newMessage);
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log((`Server running on port ${PORT}`));
    
})