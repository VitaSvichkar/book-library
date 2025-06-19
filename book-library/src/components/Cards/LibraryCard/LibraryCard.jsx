import c from '../cards.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faHeart,
  faCheckDouble,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { ProgressBar } from '../../ui/ProgressBar/ProgressBar';
import { Badge } from '../../ui/Badge/Badge';
import { Grade } from '../../ui/Grade/Grade';

export const LibraryCard = React.memo((props) => {
  const status = getStatusClass(props.book.status);

  function getStatusClass(status) {
    return status === 'reading' || status === 'completed' ? status : '';
  }

  return (
    <>
      <div className={c.bookActions}>
        <Badge status={status} />

        <button
          className={`${c.btn} ${
            props.book.isFavorite ? c.btnAddFavorites : c.bthFavorite
          }`}
          onClick={props.handleToggleFavorite}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>

      <div className={c.cardInfo}>
        <div className={c.bookCover}>
          <img src={props.bookCover} alt="bookCover" />
        </div>

        <div className={c.cardDescription}>
          <h2 title={props.title}>{props.title}</h2>

          <p className={c.author}>
            <span>{props.author}</span>
          </p>

          <div className={c.wrapLabel}>
            <ProgressBar
              id={props.book.id}
              book={props.book}
              isFinished={props.book.isFinished}
              pages={props.book.volumeInfo?.pageCount}
            />
          </div>

          <div className={c.wrapStar}>
            <Grade grade={props.book.grade} id={props.book.id} />
          </div>

          <div className={c.wrapBtn}>
            <button
              onClick={() => props.handleToggleFinish(props.book)}
              className={`${c.btn} ${
                props.book.isFinished ? c.btnFinished : c.btnFinish
              }`}
            >
              <FontAwesomeIcon
                icon={props.book.isFinished ? faCheckDouble : faCheck}
              />
            </button>

            <button
              className={`${c.btn} ${c.btnDelete}`}
              onClick={props.handleDeleteBook}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
