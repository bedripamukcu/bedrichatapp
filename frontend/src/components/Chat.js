import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setMessages } from '../store/chatSlice';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import "./Chat.css";

const socket = io('http://localhost:5000');

const Chat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const messages = useSelector((state) => state.chat.messages);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.on('initialMessages', (existingMessages) => {
            dispatch(setMessages(existingMessages));
        });
        socket.on('newMessage', (newMessage) => {
            dispatch(addMessage(newMessage));
        });

        return () => {
            socket.off('initialMessages');
            socket.off('newMessage');
        };
    }, [dispatch]);

    const sendMessage = () => {
        if (input.trim()) {
            const newMessage = { text: input, sender: 'User' };
            socket.emit('sendMessage', newMessage);
            setInput('');
        }
    };

    const handleLogout = () => {
        dispatch(logout()); //redux-state-clear
        navigate('/'); 
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat Room</h2>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className="chat-box">
                <div className="chat-boxi">
                    {messages.map((message, index) => (
                        <div key={index} className='chat-message'>
                            <strong style={{ color: '#007BFF' }}>{message.sender}:</strong> {message.text}
                        </div>
                    ))}
                </div>

                <div className="chat-messagei">
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
                        className="chat-type"
                    />
                    <button onClick={sendMessage} className="chat-button">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
