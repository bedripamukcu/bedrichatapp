import React from 'react';
import Chat from './components/Chat';  
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
    const token = useSelector((state) => state.auth?.token || null);

    return (
        <Router>
            <div>
                <h1>Chat Application</h1>
                <Routes>
                    <Route path="/" element={token ? <Chat /> : <Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
