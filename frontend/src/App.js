import React from 'react';
import Chat from './components/Chat';  
import Login from './components/Login';
import { useSelector } from 'react-redux';
const App = () => {
    const token = useSelector((state) => state.auth?.token || null);
    return (
        <div>
            <h1>Chat Application</h1>
            {token ? <Chat /> : <Login/> }  
        </div>
    );
};

export default App;
