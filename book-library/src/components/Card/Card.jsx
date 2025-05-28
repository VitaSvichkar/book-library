import { Category } from '../ui/Category/Category';
import c from './card.module.css';
import React from 'react';

export const Card = React.memo(
  ({
    badge,
    progressBar,
    grade,
    renderButton,
    book,
    handleSearchAuthor,
    handleOpenModal,
    deleteBook,
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

    return (
      <div
        className={c.wrap}
        onClick={(e) => handleOpenModal(e, book, classes)}
      >
        {badge}

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

            {progressBar && <div className="wrapLabel">{progressBar}</div>}
            {grade}

            <div className={c.wrapBtn}>
              <div>{renderButton(book)}</div>
              <div>{deleteBook}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
