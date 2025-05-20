import { setLastKeyword } from './searchSlice';
import { fetchBooksFromAPI } from './fetchBooksFromAPI';
import {
  clearBooks,
  setBooks,
  setBuffer,
  setIsLoading,
  setStartIndex,
} from './booksSlice';

export const fetchBooks = (value, type) => async (dispatch, getState) => {
  const state = getState();
  const lastKeyword = state.search.lastKeyword;

  if (lastKeyword === value) {
    console.log('return ');
    return;
  }
  dispatch(setBuffer([]));
  dispatch(clearBooks());
  dispatch(setStartIndex(0));
  dispatch(setLastKeyword(value));

  const maxResult = state.books.maxResult;
  const queryType = type || state.search.queryType;

  const { booksToShow, bufferLeft, nextIndex } = await fetchBooksFromAPI(
    value,
    queryType,
    0,
    [],
    maxResult
  );

  console.log(booksToShow, bufferLeft);
  dispatch(setBooks(booksToShow));
  dispatch(setBuffer(bufferLeft));
  dispatch(setStartIndex(nextIndex));
  dispatch(setIsLoading()); //false
};
