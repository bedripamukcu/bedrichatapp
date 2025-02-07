import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';

const Login = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(loginSuccess({ user : data.username, token: data.token}))
        } else {
            alert (data.message);
        }
        }

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;

