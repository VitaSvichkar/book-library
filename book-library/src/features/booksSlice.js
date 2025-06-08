import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  maxResult: 12,
  startIndex: 0,
  buffer: [],
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

export const { setBooks, clearBooks, setStartIndex, setBuffer, setIsAdded } =
  booksSlice.actions;

export function getBooksState(state) {
  return state.books;
}

export default booksSlice;
