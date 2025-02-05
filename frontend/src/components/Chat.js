import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setMessages } from '../store/chatSlice';
import api from '../api'
import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); //socket.io-client connects the frontend to the backend WebSocket server.

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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            maxWidth: '600px',
            margin: '50px auto',
            fontFamily: 'Arial, sans-serif',
            border: '1px solid #ddd',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
        }}>
            <div style={{
                flex: 1,
                padding: '20px',
                backgroundColor: '#f9f9f9',
                height: '300px',
                overflowY: 'auto',
            }}>
                {messages.map((message, index) => (
                    <div key={index} style={{
                        marginBottom: '15px',
                        padding: '10px',
                        backgroundColor: '#fff',
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}>
                        <strong style={{ color: '#007BFF' }}>{message.sender}:</strong> {message.text}
                    </div>
                ))}
            </div>
    
            <div style={{
                display: 'flex',
                padding: '15px',
                borderTop: '1px solid #ddd',
                backgroundColor: '#fff',
            }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                    placeholder="Type your message..."
                    style={{
                        flex: 1,
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        marginRight: '10px',
                    }}
                />
                <button
                    onClick={sendMessage}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}    

export default Chat;
