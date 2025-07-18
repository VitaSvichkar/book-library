import c from '../ui.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGrade } from '../../../features/myBooksSlice';
import { Book } from '../../../types/book';
import { AppDispatch } from '../../../app/store';

type GradeProps = {
  grade: Book['grade'];
  id: Book['id'];
};

export const Grade: FC<GradeProps> = React.memo(({ grade, id }) => {
  const dispatch: AppDispatch = useDispatch();
  const [hovered, setHovered] = useState<(0 | 1)[]>(Array(5).fill(0));

  const [stars, setStars] = useState<(0 | 1)[]>(
    Array(5)
      .fill(0)
      .map((_, i) => (i < grade ? 1 : 0))
  );

  function handleHoverStars(i: number) {
    setHovered((prev) => prev.map((_, ind) => (ind <= i ? 1 : 0)));
  }

  function handleSetGrade(ind: number) {
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

  const arr: number[] = hovered[0] ? hovered : stars;

  return (
    <div className={c.wrap}>
      {arr.map((el, i) => {
        return (
          <span
            onMouseOver={() => handleHoverStars(i)}
            onMouseLeave={() => setHovered(Array(5).fill(0))}
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
