import c from '../cards.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

export const CatalogCard = React.memo((props) => {
  return (
    <div className={c.cardInfo}>
      <div className={c.bookCover}>
        <img src={props.bookCover} alt="bookCover" />
      </div>

      <div className={c.cardDescription}>
        <h2 title={props.title}>{props.title}</h2>

        <div className={c.authorLink}>
          <span
            onClick={(e) => props.handleSearchTags(e, props.author, 'author')}
          >
            {props.author}
          </span>
        </div>

        <div className={c.categories}>
          {props.category && (
            <span
              className={c.category}
              onClick={(e) =>
                props.handleSearchTags(e, props.category, 'category')
              }
            >
              {props.category}
            </span>
          )}
        </div>

        <div className={c.wrapBtn}>
          <button
            disabled={props.limitBooks && !props.book.isAdded}
            onClick={() => props.handleToggleAddBook(props.book)}
            className={`${c.btn} ${props.book.isAdded ? c.btnAdded : c.btnAdd}`}
          >
            <FontAwesomeIcon icon={props.book.isAdded ? faCheck : faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
});
