import c from './myLibrary.module.css';
import { Button } from '../ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getMyBooks, setFinish } from '../../features/myBooksSlice';
import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CardWrapper } from '../Card/CardWrapper';

export function MyLibrary({ myLibraryNavigation }) {
  const myBooks = useSelector(getMyBooks);
  const dispatch = useDispatch();

  const handleToggleFinish = useCallback(
    (book) => {
      book.isFinished
        ? dispatch(setFinish({ id: book.id, value: false }))
        : dispatch(setFinish({ id: book.id, value: true }));
    },
    [dispatch]
  );

  const renderButton = useCallback(
    (book) => {
      return (
        <Button
          onClick={() => handleToggleFinish(book)}
          className={book.isFinished ? 'btnFinished' : 'btnFinish'}
        >
          <FontAwesomeIcon icon={book.isFinished ? faCheckDouble : faCheck} />
        </Button>
      );
    },
    [handleToggleFinish]
  );

  console.log('my library');

  return (
    <div className={c.wrap}>
      {myLibraryNavigation}

      <main className={c.wrapBooks}>
        {myBooks.length > 0 &&
          myBooks.map((book, i) => {
            return (
              <CardWrapper
                key={book.id}
                renderButton={renderButton}
                book={book}
                i={i}
                isMyLibrary={true}
              />
            );
          })}
      </main>
    </div>
  );
}
