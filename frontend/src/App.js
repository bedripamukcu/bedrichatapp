import React from 'react';
import Chat from './components/Chat';  // Chat bileşenini import ediyoruz

const App = () => {
    return (
        <div>
            <h1>Chat Application</h1>
            <Chat />  {/* Chat bileşenini burada render ediyoruz */}
        </div>
    );
};

export default App;
