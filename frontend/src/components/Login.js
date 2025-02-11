import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import "./Login.css";
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
        <div className="auth-container">
        <div className={`auth-box ${isSignup ? "signup-mode" : ""}`}>
            <h2>{isSignup ? "Sign Up" : "Login"}</h2>
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
            <button onClick={handleAuth}>{isSignup ? "Sign Up" : "Login"}</button>
            <p className="switch-text" onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </p>
        </div>
    </div>
    );
};

export default Auth;
