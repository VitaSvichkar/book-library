import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  totalItems: 0,
  maxResult: 12,
  startIndex: 0,
  attempts: 0,
  buffer: [],
  isLoading: {
    search: false,
    loadMore: false,
  },
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      return { ...state, books: [...state.books, ...action.payload] };
    },

    clearBooks: (state) => {
      return { ...state, books: [] };
    },

    setIsLoading: (state, action) => {
      const { type, value } = action.payload;
      return { ...state, isLoading: { ...state.isLoading, [type]: value } };
    },

    setIsAdded: (state, action) => {
      return {
        ...state,
        books: state.books.map((book) => {
          if (book.id === action.payload) {
            return { ...book, isAdded: !book.isAdded };
          } else {
            return book;
          }
        }),
      };
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
  setBuffer,
  setIsLoading,
  setIsAdded,
} = booksSlice.actions;

export function getBooksState(state) {
  return state.books;
}

export default booksSlice;
