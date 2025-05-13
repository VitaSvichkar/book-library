import { configureStore } from '@reduxjs/toolkit';
import booksSlice from '../features/booksSlice';
import modalSlice from '../features/modalSlice';

const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
    modal: modalSlice.reducer,
  },
});

window.store = store;
export default store;
