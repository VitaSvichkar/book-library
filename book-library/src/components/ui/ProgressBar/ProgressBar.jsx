import c from '../ui.module.css';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFinish, toggleBookFinished } from '../../../features/myBooksSlice';

export const ProgressBar = React.memo(({ id, pages, isFinished, book }) => {
  const [progress, setBarState] = useState(book.progress);
  const savedValue = useRef(progress);
  const dispatch = useDispatch();
  const width = (progress / pages) * 100;

  function handleSetProgressLocal(e) {
    setBarState(e.target.value);
  }

  function updateStateBook(newProgress) {
    dispatch(
      toggleBookFinished({
        id: id,
        progress: Number(newProgress),
        pages: pages,
      })
    );
  }

  function handleSetProgressGlobal() {
    savedValue.current = progress;

    Number(progress) === pages
      ? dispatch(setFinish({ id, value: true }))
      : dispatch(setFinish({ id, value: false }));

    updateStateBook(progress);
  }

  useEffect(() => {
    const savedValueNumber = Number(savedValue.current);
    const value = isFinished
      ? pages
      : savedValueNumber === pages
      ? 0
      : savedValueNumber;

    setBarState(value);

    if (value !== book.progress) {
      updateStateBook(value);
    }
  }, [isFinished]);

  return (
    <>
      <label className={c.labelProgress}>
        <input
          onChange={handleSetProgressLocal}
          onMouseUp={handleSetProgressGlobal}
          onTouchEnd={handleSetProgressGlobal}
          type="range"
          min="0"
          max={pages}
          value={progress}
        />
        <div style={{ width: width + '%' }}></div>
      </label>
      <span>
        {progress}/{pages}
      </span>
    </>
  );
});
