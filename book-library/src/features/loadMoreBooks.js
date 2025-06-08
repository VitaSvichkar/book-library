import { setBooks, setBuffer, setStartIndex } from './booksSlice';
import checkAndSetIsAdded from '../utils/checkAndSetIsAdded';
import { fetchBooksFromAPI } from './fetchBooksFromAPI';

export const loadMoreBooks = (value, type) => async (dispatch, getState) => {
  const state = getState();
  const { buffer, startIndex, maxResult } = state.books;
  const queryType = type || state.search.queryType;
  const myAddedBooks = state.myBooks.myBooks;

  const { booksToShow, bufferLeft, nextIndex } = await fetchBooksFromAPI(
    value,
    queryType,
    startIndex,
    buffer,
    maxResult
  );

  // set book.isAdded
  const books = checkAndSetIsAdded(myAddedBooks, booksToShow);

  dispatch(setBooks(books));
  dispatch(setBuffer(bufferLeft));
  dispatch(setStartIndex(nextIndex));
};
