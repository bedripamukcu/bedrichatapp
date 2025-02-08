import React from 'react';
import ReactDOM from 'react-dom/client';  
import store from './store/store';  
import App from './App';  
import './index.css';  
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Use createRoot instead of render

root.render(
    <Provider store={store}>
        <App />
    </Provider>,
      document.getElementById("root")

);
