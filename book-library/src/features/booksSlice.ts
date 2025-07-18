import { RootState } from '../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types/book';
import { InitValuesBooks } from '../types/booksSlice';

const initialState: InitValuesBooks = {
  books: [],
  maxResult: 12,
  startIndex: 0,
  buffer: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      return { ...state, books: [...state.books, ...action.payload] };
    },

    clearBooks: (state) => {
      return { ...state, books: [] };
    },

    setIsAdded: (state, action: PayloadAction<string>) => {
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

    setStartIndex: (state, action: PayloadAction<number>) => {
      return { ...state, startIndex: action.payload };
    },

    setBuffer: (state, action: PayloadAction<Book[]>) => {
      return { ...state, buffer: [...action.payload] };
    },
  },
});

export const { setBooks, clearBooks, setStartIndex, setBuffer, setIsAdded } =
  booksSlice.actions;

export const getBooksState = (state: RootState): RootState['books'] => {
  return state.books;
};

export default booksSlice;
