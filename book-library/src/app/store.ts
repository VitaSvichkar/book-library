import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import booksSlice from '../features/booksSlice';
import modalSlice from '../features/modalSlice';
import searchSlice from '../features/searchSlice';
import myBooksSlices from '../features/myBooksSlice.ts';

const rootReducer = combineReducers({
  books: booksSlice.reducer,
  modal: modalSlice.reducer,
  search: searchSlice.reducer,
  myBooks: myBooksSlices.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['myBooks'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
// window.store = store;
// export default store;
