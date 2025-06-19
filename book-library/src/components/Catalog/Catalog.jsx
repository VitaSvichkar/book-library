import c from './catalog.module.css';
import { CardWrapper } from '../Cards/CardWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksState } from '../../features/booksSlice';
import { getKeyword } from '../../features/searchSlice';
import { loadMoreBooks } from '../../features/loadMoreBooks';
import { Loading } from '../ui/Loading/Loading';
import { Search } from '../Search/Search';
import { useCallback, useState } from 'react';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import { openModal } from '../../features/modalSlice';
import { getMyBooks } from '../../features/myBooksSlice';
import { checkIgnoreModalClick } from '../../utils/checkIgnoreModalClick';

export function Catalog() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRequest, setIsRequest] = useState(false);

  const { books, buffer } = useSelector(getBooksState);
  const keyword = useSelector(getKeyword);
  const myBooks = useSelector(getMyBooks);
  const dispatch = useDispatch();
  const limitBooks = myBooks.length >= 50;

  const handleOpenModal = useCallback(
    (e, book, c) => {
      if (checkIgnoreModalClick(e, c)) {
        dispatch(openModal({ type: 'CATALOG', book: book }));
      }
    },
    [dispatch]
  );

  const handleLoadData = useCallback(async () => {
    setIsLoading(true);
    await dispatch(loadMoreBooks(keyword));
    setIsLoading(false);
  }, [dispatch, keyword]);

  return (
    <>
      <Search
        setIsLoading={setIsLoading}
        setIsRequest={setIsRequest}
        keyword={keyword}
      />

      {isLoading && books.length < 1 && <Loading />}

      {isRequest && !isLoading && books.length < 1 && (
        <p className={c.infoMessage}>
          We couldn't find anything. Maybe try another keyword? 😸
        </p>
      )}

      {limitBooks && books.length > 0 && (
        <div className={`${c.limitMessage} ${c.infoMessage} `}>
          Looks like you've reached the 50-book limit! We’re working on letting
          you add more soon! 😸
        </div>
      )}

      {books.length > 0 && (
        <main className={c.main}>
          <div className={c.wrap}>
            <div className={c.books}>
              {books.map((book, i) => {
                return (
                  <CardWrapper
                    key={book.id + i}
                    book={book}
                    handleOpenModal={handleOpenModal}
                    isMyLibrary={false}
                    setIsLoading={setIsLoading}
                    {...(limitBooks ? { limitBooks } : {})}
                  />
                );
              })}
            </div>

            {isLoading && <Loading />}

            {buffer.length > 0 && !isLoading && (
              <LoadMoreButton onClick={handleLoadData} isLoading={isLoading} />
            )}
          </div>
        </main>
      )}
    </>
  );
}
