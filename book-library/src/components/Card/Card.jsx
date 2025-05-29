import { Category } from '../ui/Category/Category';
import c from './card.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faHeart,
  faCheckDouble,
  faCheck,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { ProgressBar } from '../ui/ProgressBar/ProgressBar';
import { Badge } from '../ui/Badge/Badge';
import { Grade } from '../ui/Grade/Grade';

export const Card = React.memo(
  ({
    book,
    handleSearchAuthor,
    handleOpenModal,
    handleDeleteBook,
    handleToggleFinish,
    handleToggleAddBook,
    handleToggleFavorite,
    isMyLibrary,
    i,
  }) => {
    const {
      volumeInfo: { authors, imageLinks, categories, title },
    } = book || {};

    console.log('CARD ' + i);

    const sliceAuthors = authors?.slice(0, 2);
    const bookСover = imageLinks.smallThumbnail;

    const classes = {
      author: c.author,
      categories: c.categories,
      wrapBtn: c.wrapBtn,
      wrapLabel: 'wrapLabel',
    };

    const status = getStatusClass(book.status);
    function getStatusClass(status) {
      return status === 'reading' || status === 'completed' ? status : '';
    }

    return (
      <div
        className={c.wrap}
        onClick={(e) => handleOpenModal(e, book, classes)}
      >
        <div className={c.bookActions}>
          {isMyLibrary && <Badge status={status} />}

          {isMyLibrary && (
            <button
              className={`${c.btn} ${
                book.isFavorite ? c.btnAddFavorites : c.bthFavorite
              }`}
              onClick={handleToggleFavorite}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          )}
        </div>

        <div className={c.cardInfo}>
          <div className={c.bookСover}>
            <img src={bookСover} alt="#" />
          </div>

          <div className={c.cardDescription}>
            <h2 title={title}>{title}</h2>
            <p className={c.authors}>
              {sliceAuthors?.map((el, i) => (
                <span
                  onClick={(e) => handleSearchAuthor(e, el)}
                  className={c.author}
                  key={i}
                >
                  {el}
                </span>
              ))}
            </p>

            <div className={c.categories}>
              <Category categories={categories} />
            </div>

            {isMyLibrary && (
              <ProgressBar
                id={book.id}
                isFinished={book.isFinished}
                pages={book.volumeInfo?.pageCount}
              />
            )}

            {isMyLibrary && <Grade />}

            <div className={c.wrapBtn}>
              <div>
                {isMyLibrary && (
                  <button
                    onClick={() => handleToggleFinish(book)}
                    className={`${c.btn} ${
                      book.isFinished ? c.btnFinished : ''
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={book.isFinished ? faCheckDouble : faCheck}
                    />
                  </button>
                )}
              </div>

              {isMyLibrary ? (
                <button
                  className={`${c.btn} ${c.btnDelete}`}
                  onClick={handleDeleteBook}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              ) : (
                <button
                  onClick={() => handleToggleAddBook(book)}
                  className={`${c.btn} ${book.isAdded ? c.btnAdded : ''}`}
                >
                  <FontAwesomeIcon icon={book.isAdded ? faCheck : faPlus} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
