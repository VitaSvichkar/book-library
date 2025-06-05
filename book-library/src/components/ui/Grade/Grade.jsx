import c from '../ui.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGrade } from '../../../features/myBooksSlice';

export const Grade = React.memo(({ grade, id }) => {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(Array(5).fill(0));

  const [stars, setStars] = useState(
    Array(5)
      .fill(0)
      .map((_, i) => (i < grade ? 1 : 0))
  );

  function handleHoverStars(i) {
    setHovered((prev) => prev.map((_, ind) => (ind <= i ? 1 : 0)));
  }

  function handleSetGrade(ind) {
    setStars((prev) =>
      prev.map((el, i) => {
        if (ind === 0 && prev[ind] === 1 && prev[ind + 1] === 0) {
          return 0;
        } else {
          return i <= ind ? 1 : 0;
        }
      })
    );

    dispatch(setGrade({ id, grade: ind + 1 }));
  }

  const arr = hovered[0] ? hovered : stars;
  return (
    <div className={c.wrap}>
      {arr.map((el, i) => {
        return (
          <span
            onMouseOver={() => handleHoverStars(i)}
            onMouseLeave={() => setHovered(Array(5).fill(null))}
            onClick={() => handleSetGrade(i)}
            className={!el ? '' : c.starIco}
            key={i}
          >
            <FontAwesomeIcon icon={faStar} />
          </span>
        );
      })}
    </div>
  );
});
