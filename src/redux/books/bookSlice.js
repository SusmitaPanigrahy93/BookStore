import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    loading: false,
    error: null,
};

const bookSlice = createSlice({
    name: Books,
    initialState,
    reducers: {
        setBooks(state, action) {
            state.list = action.payload;
        },
        addBooks(state, action) {
            state.list.push(action,payload);
        },
        removeBooks(state,payload) {
            state.list = state.list.filter(book => book.id !== action.payload);
        },
    },
});

export const { setBooks, addBooks, removeBooks } = bookSlice.actions;
export default bookSlice.reducer;