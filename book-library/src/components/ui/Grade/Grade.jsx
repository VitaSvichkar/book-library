import c from '../ui.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

export const Grade = React.memo(() => {
  const [stars, setStars] = useState(Array(5).fill(0));

  function handleSetGrade(ind) {
    setStars((prev) => {
      const newArr = Array(5)
        .fill(0)
        .map((_, i) => {
          if (
            (ind === 0 || ind === i) &&
            prev[ind + 1] === 0 &&
            prev[ind] === 1
          ) {
            return 0;
          }

          return i <= ind ? 1 : 0;
        });

      return newArr;
    });
  }

  return (
    <div className={c.wrapStar}>
      <div>
        {stars.map((el, i) => {
          return (
            <span
              onClick={() => handleSetGrade(i)}
              className={!el ? '' : c.starIco}
              key={i}
            >
              <FontAwesomeIcon icon={faStar} />
            </span>
          );
        })}
      </div>
    </div>
  );
});
