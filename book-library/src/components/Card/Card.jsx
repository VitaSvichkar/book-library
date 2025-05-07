import c from './card.module.css';
import bookCover from '../../../public/bookCover.jpg';
import React from 'react';

export function Card({ badge, progressBar, grade, button }) {
  return (
    <div className={`${c.wrap}`}>
      {badge}

      <div className={`${c.cardInfo}`}>
        <div className={c.bookСover}>
          <img src={bookCover} alt="book" />
        </div>

        <div className={c.cardDescription}>
          <h2>Dopamine Nation</h2>
          <p className={c.author}>Anna Lembke</p>

          <div className={c.category}>
            <span>Nonfiction</span>
            <span>Psychological</span>
          </div>

          {progressBar}
          {grade}

          <div className={c.wrapBtn}>{button}</div>
        </div>
      </div>
    </div>
  );
}
