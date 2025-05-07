import { configureStore } from '@reduxjs/toolkit';
import booksSlice from '../features/booksSlice';

const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
});

export default store;
