import c from './catalog.module.css';
import { CardWrapper } from '../Card/CardWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksState, setIsLoading } from '../../features/booksSlice';
import { getKeyword } from '../../features/searchSlice';
import { loadMoreBooks } from '../../features/loadMoreBooks';
import { Loading } from '../ui/Loading/Loading';
import { Search } from '../Search/Search';
import { useCallback } from 'react';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import { openModal } from '../../features/modalSlice';
import { getMyBooks } from '../../features/myBooksSlice';

export function Catalog() {
  console.log('catalog');
  const { books, buffer, isLoading } = useSelector(getBooksState);
  const keyword = useSelector(getKeyword);
  const dispatch = useDispatch();
  const myBooks = useSelector(getMyBooks);
  const limitBooks = myBooks.length >= 50;

  const handleOpenModal = useCallback(
    (e, book, c) => {
      if (
        e.target.closest(`.${c.author}`) ||
        e.target.closest(`.${c.categories}`) ||
        e.target.closest(`.${c.btn}`) ||
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

  return (
    <>
      <Search />
      <main className={c.main}>
        {limitBooks && books.length > 0 && (
          <div className={c.limitMessage}>
            Looks like you've reached the 50-book limit! We’re working on
            letting you add more soon! 😸
          </div>
        )}
        {books.length > 0 && (
          <div className={c.wrap}>
            <div className={c.books}>
              {books.map((book, i) => {
                return (
                  <CardWrapper
                    key={book.id}
                    book={book}
                    i={i}
                    handleOpenModal={handleOpenModal}
                    isMyLibrary={false}
                    {...(limitBooks ? { limitBooks } : {})}
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
