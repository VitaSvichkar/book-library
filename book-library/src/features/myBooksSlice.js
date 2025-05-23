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
  },
});

export const { addBook, removeBook } = myBooksSlices.actions;

export function getMyBooks(state) {
  return state?.myBooks.myBooks;
}
export default myBooksSlices;
