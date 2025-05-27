import c from './catalog.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CardWrapper } from '../Card/CardWrapper';
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
import { fetchBooks } from '../../features/fetchBooks';
import { setKeyword, setTypeQuery } from '../../features/searchSlice';
import { openModal } from '../../features/modalSlice';

export function Catalog() {
  const { books, buffer, isLoading } = useSelector(getBooksState);
  const keyword = useSelector(getKeyword);
  const dispatch = useDispatch();

  const handleOpenModal = useCallback(
    (e, book, c) => {
      if (
        e.target.closest(`.${c.author}`) ||
        e.target.closest(`.${c.categories}`) ||
        e.target.closest(`.${c.wrapBtn}`) ||
        e.target.closest(`.${c.wrapLabel}`)
      ) {
        return;
      }
      dispatch(openModal(book));
    },
    [dispatch]
  );

  const handleLoadData = useCallback(() => {
    dispatch(setIsLoading({ type: 'loadMore', value: true }));
    dispatch(loadMoreBooks(keyword));
  }, [dispatch]);

  const handleSearchAuthor = useCallback(
    (e, el) => {
      e.preventDefault();
      dispatch(setIsLoading({ type: 'search', value: true }));
      dispatch(setTypeQuery('author'));
      dispatch(setKeyword(el));
      dispatch(fetchBooks(el, 'author'));
    },
    [dispatch]
  );

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
                  <CardWrapper
                    key={book.id}
                    book={book}
                    i={i}
                    renderButton={renderButton}
                    handleOpenModal={handleOpenModal}
                    handleSearchAuthor={handleSearchAuthor}
                    isMyLibrary={false}
                  />
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
