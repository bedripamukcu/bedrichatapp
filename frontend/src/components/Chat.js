import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../store/chatSlice';

const Chat = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (input.trim()) {
            dispatch(addMessage({ text: input, sender: 'User' }));
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
