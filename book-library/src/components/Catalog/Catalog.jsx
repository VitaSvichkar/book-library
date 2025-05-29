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
                    handleOpenModal={handleOpenModal}
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
