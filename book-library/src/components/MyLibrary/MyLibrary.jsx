import c from './myLibrary.module.css';
import { Card } from '../Card/Card';
import { Badge } from '../ui/Badge/Badge';
import { ProgressBar } from '../ui/ProgressBar/ProgressBar';
import { Grade } from '../ui/Grade/Grade';
import { Button } from '../ui/Button/Button';
import { Aside } from '../Aside/Aside';
import { MyLibraryNavigation } from '../MyLibraryNavigation/MyLibraryNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { getMyBooks, setFinish } from '../../features/myBooksSlice';
import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faCheck } from '@fortawesome/free-solid-svg-icons';

export function MyLibrary() {
  const myBooks = useSelector(getMyBooks);
  const dispatch = useDispatch();

  function getStatusClass(status) {
    return status === 'reading' || status === 'completed' ? status : '';
  }

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

  return (
    <div className={c.wrap}>
      <Aside>
        <MyLibraryNavigation />
      </Aside>

      <main className={c.wrapBooks}>
        {myBooks.length > 0 &&
          myBooks.map((book, i) => {
            const status = getStatusClass(book.status);

            return (
              <Card
                key={book.id}
                badge={<Badge status={status} />}
                progressBar={
                  <ProgressBar
                    id={book.id}
                    isFinished={book.isFinished}
                    pages={book.volumeInfo?.pageCount}
                  />
                }
                grade={<Grade />}
                button={renderButton}
                book={book}
                i={i}
              />
            );
          })}
      </main>
    </div>
  );
}
