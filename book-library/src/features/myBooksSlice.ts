import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types/book';
import { RootState } from '../app/store';

export type FilterType = 'favorite' | 'read' | 'reading' | '';

type InitValues = {
  myBooks: Book[];
  filter: FilterType;
};

const initialState: InitValues = {
  myBooks: [],
  filter: '',
};

const myBooksSlices = createSlice({
  name: 'myBooks',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      return { ...state, myBooks: [...state.myBooks, action.payload] };
    },

    removeBook: (state, action: PayloadAction<Book['id']>) => {
      return {
        ...state,
        myBooks: state.myBooks.filter((book) => book.id !== action.payload),
      };
    },

    setFinish: (
      state,
      action: PayloadAction<{ id: Book['id']; value: boolean }>
    ) => {
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

    setIsFavorite: (state, action: PayloadAction<Book['id']>) => {
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

    setFilterType: (state, action: PayloadAction<FilterType>) => {
      return { ...state, filter: action.payload };
    },

    setReview: (
      state,
      action: PayloadAction<{ id: Book['id']; review: string }>
    ) => {
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

    setGrade: (
      state,
      action: PayloadAction<{ id: Book['id']; grade: number }>
    ) => {
      return {
        ...state,
        myBooks: state.myBooks.map((book) => {
          if (book.id === action.payload.id) {
            return { ...book, grade: action.payload.grade };
          } else {
            return book;
          }
        }),
      };
    },

    toggleBookFinished: (
      state,
      action: PayloadAction<{ id: Book['id']; pages: number; progress: number }>
    ) => {
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
  setFinish,
  setReview,
  setGrade,
  setIsFavorite,
  setFilterType,
} = myBooksSlices.actions;

export const getMyBooks = (state: RootState): Book[] => {
  return state.myBooks.myBooks;
};

export const getFilterType = (state: RootState): InitValues['filter'] => {
  return state.myBooks.filter;
};

export default myBooksSlices;
