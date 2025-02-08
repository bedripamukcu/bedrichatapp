import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false); 
    const dispatch = useDispatch();

    const handleAuth = async () => {
        const endpoint = isSignup ? 'signup' : 'login';
        const response = await fetch(`http://localhost:5000/auth/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            if (isSignup) {
                alert("Signup successful! Please log in.");
                setIsSignup(false); 
            } else {
                dispatch(loginSuccess({ user: data.username, token: data.token }));
            }
        } else {
            alert(data.message);
        }
    };

    return (
        <div>
            <h2>{isSignup ? 'Signup' : 'Login'}</h2>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleAuth}>{isSignup ? 'Signup' : 'Login'}</button>
            <p onClick={() => setIsSignup(!isSignup)} style={{ cursor: 'pointer', color: 'blue' }}>
                {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
            </p>
        </div>
    );
};

export default Auth;
