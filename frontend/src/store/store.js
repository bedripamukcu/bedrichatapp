import {configureStore} from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import authReducer from './authSlice';

const store = configureStore({
    reducer : {
        auth: authReducer,
        chat: chatReducer,
    },
});

export default store;