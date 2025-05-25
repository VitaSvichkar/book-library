import c from '../ui.module.css';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setProgress,
  toggleBookFinished,
} from '../../../features/myBooksSlice';

export function ProgressBar({ id, pages, isFinished }) {
  const [progress, setBarState] = useState(isFinished ? 100 : 0);
  const savedValue = useRef(progress);
  const dispatch = useDispatch();
  const width = (progress / pages) * 100;

  function handleSetProgressLocal(e) {
    setBarState(e.target.value);
  }

  function handleSetProgressGlobal() {
    savedValue.current = progress;

    Number(progress) === pages
      ? dispatch(toggleBookFinished({ id: id, value: true }))
      : dispatch(toggleBookFinished({ id: id, value: false }));

    dispatch(setProgress({ id: id, value: progress }));
  }

  useEffect(() => {
    isFinished ? setBarState(pages) : setBarState(savedValue.current);
  }, [isFinished, pages]);

  return (
    <div className={c.wrapLabel}>
      <label className={c.labelProgress}>
        <input
          onChange={handleSetProgressLocal}
          onMouseUp={handleSetProgressGlobal}
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
    </div>
  );
}
