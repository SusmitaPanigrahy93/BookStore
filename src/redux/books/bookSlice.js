import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooksFromAPI } from "../../api/fakeBooksAPI";

const initialState = {
    list: [],
    loading: false,
    error: null,
};

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async(__, thunkAPI) => {
        try {
            const response = await fetchBooksFromAPI();
            return response;
        } catch(error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks(state, action) {
            state.list = action.payload;
        },
        addBooks(state, action) {
            state.list.push(action.payload);
        },
        removeBooks(state,action) {
            state.list = state.list.filter(book => book.id !== action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchBooks.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setBooks, addBooks, removeBooks } = bookSlice.actions;
export default bookSlice.reducer;