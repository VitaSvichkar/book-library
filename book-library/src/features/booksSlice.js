import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  totalItems: 0,
  maxResult: 12,
  isLoading: false,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      return { ...state, list: [...state.list, ...action.payload] };
    },

    clearBooks: (state) => {
      return { ...state, list: [] };
    },

    setTotalItems: (state, action) => {
      return { ...state, totalItems: action.payload };
    },
  },
});

export const { setBooks, clearBooks, setTotalItems } = booksSlice.actions;

export function getBooksState(state) {
  return state.books;
}

export default booksSlice;
