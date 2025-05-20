import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  totalItems: 0,
  maxResult: 12,
  startIndex: 0,
  attempts: 0,
  buffer: [],
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

    setIsLoading: (state) => {
      return { ...state, isLoading: !state.isLoading };
    },

    setTotalItems: (state, action) => {
      return { ...state, totalItems: action.payload };
    },

    setAttempts: (state, action) => {
      return { ...state, attempts: action.payload };
    },

    setStartIndex: (state, action) => {
      return { ...state, startIndex: action.payload };
    },

    setBuffer: (state, action) => {
      return { ...state, buffer: [...action.payload] };
    },
  },
});

export const {
  setBooks,
  clearBooks,
  setStartIndex,
  setTotalItems,
  setBuffer,
  setAttempts,
  setIsLoading,
} = booksSlice.actions;

export function getBooksState(state) {
  return state.books;
}

export default booksSlice;
