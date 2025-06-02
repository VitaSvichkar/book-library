import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myBooks: [],
  filter: '',
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

    setIsFavorite: (state, action) => {
      return {
        ...state,
        myBooks: state.myBooks.map((book) => {
          if (book.id === action.payload) {
            return { ...book, isFavorite: !book.isFavorite };
          } else {
            return book;
          }
        }),
      };
    },

    setFilterType: (state, action) => {
      return { ...state, filter: action.payload };
    },

    setReview: (state, action) => {
      return {
        ...state,
        myBooks: state.myBooks.map((book) => {
          if (book.id === action.payload.id) {
            return { ...book, review: action.payload.review };
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
  setReview,
  setIsFavorite,
  setFilterType,
} = myBooksSlices.actions;

export function getMyBooks(state) {
  return state.myBooks.myBooks;
}

export function getFilterType(state) {
  return state.myBooks.filter;
}
export default myBooksSlices;
