import { setBooks, setBuffer, setIsLoading, setStartIndex } from './booksSlice';
import { fetchBooksFromAPI } from './fetchBooksFromAPI';

export const loadMoreBooks = (value, type) => async (dispatch, getState) => {
  const state = getState();
  const { buffer, startIndex, maxResult } = state.books;
  const queryType = type || state.search.queryType;

  const { booksToShow, bufferLeft, nextIndex } = await fetchBooksFromAPI(
    value,
    queryType,
    startIndex,
    buffer,
    maxResult
  );

  dispatch(setBooks(booksToShow));
  dispatch(setBuffer(bufferLeft));
  dispatch(setStartIndex(nextIndex));
  dispatch(setIsLoading()); //false
};
