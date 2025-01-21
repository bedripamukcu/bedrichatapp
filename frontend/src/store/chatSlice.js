import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],  // Start with an empty array for messages
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);  // Add new message
        },
        setMessages: (state, action) => {
            state.messages = action.payload;  // Replace messages if necessary
        },
    },
});

export const { addMessage, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
