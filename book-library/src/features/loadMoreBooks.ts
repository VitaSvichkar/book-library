import { setBooks, setBuffer, setStartIndex } from './booksSlice';
import { fetchBooksFromAPI } from './fetchBooksFromAPI';
import { AppDispatch, RootState } from '../app/store';
import { QueryTypes } from '../types/searchSlice';
import { Book } from '../types/book';
import { InitValuesBooks } from '../types/booksSlice';
import checkAndSetIsAdded from '../utils/checkAndSetIsAdded';

export const loadMoreBooks =
  (value: string, type?: QueryTypes) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    const state: RootState = getState();

    const { buffer, startIndex, maxResult }: InitValuesBooks = state.books;
    const queryType: QueryTypes = type || state.search.queryType;
    const myAddedBooks: Book[] = state.myBooks.myBooks;

    const { booksToShow, bufferLeft, nextIndex } = await fetchBooksFromAPI(
      value,
      queryType,
      startIndex,
      buffer,
      maxResult
    );

    // set book.isAdded
    const books: Book[] = checkAndSetIsAdded(myAddedBooks, booksToShow);

    dispatch(setBooks(books));
    dispatch(setBuffer(bufferLeft));
    dispatch(setStartIndex(nextIndex));
  };
