import { fetchBooksFromAPI } from './fetchBooksFromAPI';
import { clearBooks, setBooks, setBuffer, setStartIndex } from './booksSlice';
import checkAndSetIsAdded from '../utils/checkAndSetIsAdded';

export const fetchBooks = (value, type) => async (dispatch, getState) => {
  const state = getState();
  const myAddedBooks = state.myBooks.myBooks;

  dispatch(setBuffer([]));
  dispatch(clearBooks());
  dispatch(setStartIndex(0));

  const maxResult = state.books.maxResult;
  const queryType = type || state.search.queryType;

  const { booksToShow, bufferLeft, nextIndex } = await fetchBooksFromAPI(
    value,
    queryType,
    0,
    [],
    maxResult
  );

  // set book.isAdded
  const books = checkAndSetIsAdded(myAddedBooks, booksToShow);

  dispatch(setBooks(books));
  dispatch(setBuffer(bufferLeft));
  dispatch(setStartIndex(nextIndex));
};
