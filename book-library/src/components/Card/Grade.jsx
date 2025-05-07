import c from './card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export function Grade() {
  const [stars, setStars] = useState(Array(5).fill(0));

  function handleSetGrade(ind) {
    setStars((prev) => {
      const newArr = Array(5)
        .fill(0)
        .map((el, i) => {
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
              onClick={() => handleSetGrade(i, el)}
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
}
