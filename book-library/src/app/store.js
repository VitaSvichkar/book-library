import { configureStore } from '@reduxjs/toolkit';
import booksSlice from '../features/booksSlice';
import modalSlice from '../features/modalSlice';
import searchSlice from '../features/searchSlice';

const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
    modal: modalSlice.reducer,
    search: searchSlice.reducer,
  },
});

window.store = store;
export default store;
