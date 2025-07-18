import { fetchBooksFromAPI } from './fetchBooksFromAPI';
import { clearBooks, setBooks, setBuffer, setStartIndex } from './booksSlice';
import { QueryTypes } from '../types/searchSlice';
import { AppDispatch, RootState } from '../app/store';
import { Book } from '../types/book';
import checkAndSetIsAdded from '../utils/checkAndSetIsAdded';

export const fetchBooks =
  (value: string, type: QueryTypes) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    const state: RootState = getState();
    const myAddedBooks: Book[] = state.myBooks.myBooks;

    dispatch(setBuffer([]));
    dispatch(clearBooks());
    dispatch(setStartIndex(0));

    const maxResult: number = state.books.maxResult;
    const queryType: QueryTypes = type || state.search.queryType;

    const { booksToShow, bufferLeft, nextIndex } = await fetchBooksFromAPI(
      value,
      queryType,
      0,
      [],
      maxResult
    );

    // set book.isAdded
    const books: Book[] = checkAndSetIsAdded(myAddedBooks, booksToShow);

    dispatch(setBooks(books));
    dispatch(setBuffer(bufferLeft));
    dispatch(setStartIndex(nextIndex));
  };
