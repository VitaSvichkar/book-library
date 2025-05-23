import c from './catalog.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Card } from '../Card/Card';
import { Button } from '../ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBooksState,
  setIsAdded,
  setIsLoading,
} from '../../features/booksSlice';
import { getKeyword } from '../../features/searchSlice';
import { loadMoreBooks } from '../../features/loadMoreBooks';
import { Loading } from '../ui/Loading/Loading';
import { Search } from '../Search/Search';
import { addBook, removeBook } from '../../features/myBooksSlice';
import { useCallback } from 'react';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

export function Catalog() {
  const { books, buffer, isLoading } = useSelector(getBooksState);
  const keyword = useSelector(getKeyword);
  const dispatch = useDispatch();

  function handleLoadData() {
    dispatch(setIsLoading({ type: 'loadMore', value: true }));
    dispatch(loadMoreBooks(keyword));
  }

  const handleToggleAddBook = useCallback(
    (book) => {
      book.isAdded ? dispatch(removeBook(book.id)) : dispatch(addBook(book));
      dispatch(setIsAdded(book.id));
    },
    [dispatch]
  );

  const renderButton = useCallback(
    (book) => {
      return (
        <Button
          onClick={() => handleToggleAddBook(book)}
          className={book.isAdded ? 'btnAdded' : 'btnAdd'}
        >
          <FontAwesomeIcon icon={book.isAdded ? faCheck : faPlus} />
        </Button>
      );
    },
    [handleToggleAddBook]
  );

  return (
    <>
      <Search />
      <main className={c.main}>
        {books.length > 0 && (
          <div className={c.wrap}>
            <div className={c.books}>
              {books.map((book, i) => {
                return (
                  <Card key={book.id} book={book} button={renderButton} i={i} />
                );
              })}
            </div>

            {isLoading.loadMore && <Loading />}

            {buffer.length > 0 && !isLoading.loadMore && (
              <LoadMoreButton
                onClick={handleLoadData}
                isLoading={isLoading.loadMore}
              />
            )}
          </div>
        )}
      </main>
    </>
  );
}
