import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setMessages } from '../store/chatSlice';
import api from '../api'
import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chat = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    const [input, setInput] = useState('');

    useEffect(()=> {
        socket.on('initialMessages', (existingMessages) =>{
            dispatch(setMessages(existingMessages))
        })
        socket.on('newMessage', (newMessage) => {
            dispatch(addMessage(newMessage))
        })
        return () => {
            socket.off('initialMessages');
            socket.off('newMessage');
        }
    }, [dispatch])

    const sendMessage = () => {
       if (input.trim()) {
        const newMessage = {text: input, sender: 'User'}
        socket.emit('sendMessage', newMessage);
        setInput('');
       }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'auto' }}>
                {messages.map((message, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <strong>{message.sender}:</strong> {message.text}
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    style={{ padding: '10px', width: '80%' }}
                />
                <button onClick={sendMessage} style={{ padding: '10px' }}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
