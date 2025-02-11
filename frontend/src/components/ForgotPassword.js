import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async () => {
        const response = await fetch('http://localhost:5000/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        setMessage(data.message);
    };
    return (
        <div>
            <h2>Forgot Password</h2>
            <input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <button onClick={handleForgotPassword}>Send Reset Link</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;