import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  isLoading: false,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      return { ...state, list: [...state.list, ...action.payload] };
    },
  },
});

export const { setBooks } = booksSlice.actions;
console.log(booksSlice.actions);
export default booksSlice;
