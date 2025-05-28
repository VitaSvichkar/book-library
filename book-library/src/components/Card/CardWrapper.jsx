import { Card } from './Card';
import { Badge } from '../ui/Badge/Badge';
import React, { useMemo } from 'react';
import { ProgressBar } from '../ui/ProgressBar/ProgressBar';
import { Grade } from '../ui/Grade/Grade';
import { Button } from '../ui/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { removeBook } from '../../features/myBooksSlice';
import { setIsAdded } from '../../features/booksSlice';

export const CardWrapper = React.memo(
  ({
    book,
    renderButton,
    handleOpenModal,
    handleSearchAuthor,
    i,
    isMyLibrary,
  }) => {
    console.log('CARD wrapper');

    const dispatch = useDispatch();
    const status = getStatusClass(book.status);
    const grade = isMyLibrary && <Grade />;

    const badge = useMemo(
      () => isMyLibrary && <Badge status={status} />,
      [status]
    );

    const progressBar = useMemo(
      () =>
        isMyLibrary && (
          <ProgressBar
            id={book.id}
            isFinished={book.isFinished}
            pages={book.volumeInfo?.pageCount}
          />
        ),
      [book.isFinished]
    );

    function getStatusClass(status) {
      return status === 'reading' || status === 'completed' ? status : '';
    }

    function handleDeleteBook() {
      dispatch(removeBook(book.id));
      dispatch(setIsAdded(book.id));
    }

    const deleteBook = isMyLibrary && (
      <Button className="btnDelete" onClick={handleDeleteBook}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    );

    return (
      <Card
        book={book}
        renderButton={renderButton}
        handleOpenModal={handleOpenModal}
        handleSearchAuthor={handleSearchAuthor}
        i={i}
        badge={badge}
        grade={grade}
        progressBar={progressBar}
        deleteBook={deleteBook}
      />
    );
  }
);
