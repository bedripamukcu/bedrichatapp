import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css'
const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async () => {
        const response = await fetch('http://localhost:5000/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword })
        });

        const data = await response.json();
        setMessage(data.message);

        if (response.ok) {
            setTimeout(() => navigate('/login'), 2000);
        }
    };

    return (
        <div className = "reset" >
            <h2>Reset Password</h2>
            <input 
                type="password" 
                placeholder="Enter new password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
            />
            <button onClick={handleResetPassword}>Reset Password</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
