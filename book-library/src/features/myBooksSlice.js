import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myBooks: [],
};

const myBooksSlices = createSlice({
  name: 'myBooks',
  initialState,
  reducers: {
    addBook: (state, action) => {
      return { ...state, myBooks: [...state.myBooks, action.payload] };
    },

    removeBook: (state, action) => {
      return {
        ...state,
        myBooks: state.myBooks.filter((book) => book.id !== action.payload),
      };
    },

    toggleBookFinished: (state, action) => {
      return {
        ...state,
        myBooks: state.myBooks.map((book) => {
          const isFinished = !book.isFinished;
          if (book.id === action.payload) {
            return {
              ...book,
              isFinished,
              status: isFinished ? 'completed' : '',
            };
          } else {
            return book;
          }
        }),
      };
    },
  },
});

export const { addBook, removeBook, toggleBookFinished, setStatus } =
  myBooksSlices.actions;

export function getMyBooks(state) {
  return state.myBooks.myBooks;
}
export default myBooksSlices;
