import c from './myLibrary.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getMyBooks, setFilterType } from '../../features/myBooksSlice';
import { CardWrapper } from '../Cards/CardWrapper';
import { useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { checkIgnoreModalClick } from '../../utils/checkIgnoreModalClick';
import { openModal } from '../../features/modalSlice';

export function MyLibrary({ myLibraryNavigation }) {
  const myBooks = useSelector(getMyBooks);
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const filter = query.get('filter');

  const handleOpenModal = useCallback(
    (e, book, c) => {
      if (checkIgnoreModalClick(e, c)) {
        dispatch(openModal({ type: 'LIBRARY', book: book }));
      }
    },
    [dispatch]
  );

  const filteredBooks = useMemo(() => {
    switch (filter) {
      case 'favorite':
        return myBooks.filter((book) => book.isFavorite);
      case 'reading':
        return myBooks.filter((book) => book.status === 'reading');
      case 'read':
        return myBooks.filter((book) => book.isFinished);
      default:
        return myBooks;
    }
  }, [filter, myBooks]);

  useEffect(() => {
    dispatch(setFilterType(filter));
  }, [dispatch, filter]);

  return (
    <div className={c.wrap}>
      {myLibraryNavigation}
      {filteredBooks.length > 0 ? (
        <div className={c.wrapMain}>
          <main className={c.main}>
            <div className={c.wrapBooks}>
              <div className={c.books}>
                {filteredBooks.map((book, i) => {
                  return (
                    <CardWrapper
                      key={book.id}
                      book={book}
                      i={i}
                      isMyLibrary={true}
                      handleOpenModal={handleOpenModal}
                    />
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div className={c.infoMessage}>
          `So quiet here... 🤫 Maybe it’s time to add your first book? 📚`
        </div>
      )}
    </div>
  );
}
