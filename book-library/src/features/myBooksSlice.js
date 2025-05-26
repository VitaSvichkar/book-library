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

    setFinish: (state, action) => {
      return {
        ...state,
        myBooks: state.myBooks.map((book) => {
          if (book.id === action.payload.id) {
            return { ...book, isFinished: action.payload.value };
          } else {
            return book;
          }
        }),
      };
    },

    toggleBookFinished: (state, action) => {
      return {
        ...state,
        myBooks: state.myBooks.map((book) => {
          if (book.id === action.payload.id) {
            if (action.payload.progress === action.payload.pages) {
              return {
                ...book,
                status: 'completed',
                progress: action.payload.progress,
              };
            } else if (action.payload.progress === 0) {
              return {
                ...book,
                status: '',
                progress: action.payload.progress,
              };
            } else {
              return {
                ...book,
                status: 'reading',
                progress: action.payload.progress,
              };
            }
          } else {
            return book;
          }
        }),
      };
    },
  },
});

export const {
  addBook,
  removeBook,
  toggleBookFinished,
  setStatus,
  setProgress,
  setFinish,
} = myBooksSlices.actions;

export function getMyBooks(state) {
  return state.myBooks.myBooks;
}
export default myBooksSlices;
