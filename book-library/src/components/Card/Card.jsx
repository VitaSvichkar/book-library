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

export const Card = React.memo((props) => {
  const {
    volumeInfo: { authors, imageLinks, categories, title },
  } = props.book || {};

  // console.log('CARD ' + props.i);

  const sliceAuthors = authors?.slice(0, 2);
  const bookСover = imageLinks.smallThumbnail;

  const classes = {
    author: c.author,
    categories: c.categories,
    wrapLabel: c.wrapLabel,
    wrapStar: c.wrapStar,
    btn: c.btn,
  };

  const status = getStatusClass(props.book.status);
  function getStatusClass(status) {
    return status === 'reading' || status === 'completed' ? status : '';
  }

  return (
    <div
      className={c.wrap}
      onClick={(e) => props.handleOpenModal(e, props.book, classes)}
    >
      <div className={c.bookActions}>
        {props.isMyLibrary && <Badge status={status} />}

        {props.isMyLibrary && (
          <button
            className={`${c.btn} ${
              props.book.isFavorite ? c.btnAddFavorites : c.bthFavorite
            }`}
            onClick={props.handleToggleFavorite}
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
          <h2 title={title}>{title.toLowerCase()}</h2>
          <p className={c.authors}>
            {sliceAuthors?.map((el, i) => (
              <span
                onClick={(e) => props.handleSearchAuthor(e, el)}
                className={c.author}
                key={i}
              >
                {el.toLowerCase()}
              </span>
            ))}
          </p>

          {!props.isMyLibrary && (
            <div className={c.categories}>
              <Category
                categories={categories}
                setIsLoading={props.setIsLoading}
              />
            </div>
          )}

          {props.isMyLibrary && (
            <div className={c.wrapLabel}>
              <ProgressBar
                id={props.book.id}
                book={props.book}
                isFinished={props.book.isFinished}
                pages={props.book.volumeInfo?.pageCount}
              />
            </div>
          )}

          {props.isMyLibrary && (
            <div className={c.wrapStar}>
              <Grade grade={props.book.grade} id={props.book.id} />
            </div>
          )}

          <div className={c.wrapBtn}>
            {props.isMyLibrary && (
              <button
                onClick={() => props.handleToggleFinish(props.book)}
                className={`${c.btn} ${
                  props.book.isFinished ? c.btnFinished : ''
                }`}
              >
                <FontAwesomeIcon
                  icon={props.book.isFinished ? faCheckDouble : faCheck}
                />
              </button>
            )}

            {props.isMyLibrary ? (
              <button
                className={`${c.btn} ${c.btnDelete}`}
                onClick={props.handleDeleteBook}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            ) : (
              <button
                disabled={props.limitBooks && !props.book.isAdded}
                onClick={() => props.handleToggleAddBook(props.book)}
                className={`${c.btn} ${props.book.isAdded ? c.btnAdded : ''}`}
              >
                <FontAwesomeIcon icon={props.book.isAdded ? faCheck : faPlus} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
