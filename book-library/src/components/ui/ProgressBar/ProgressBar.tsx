import c from '../ui.module.css';
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFinish, toggleBookFinished } from '../../../features/myBooksSlice';
import { Book, VolumeInfo } from '../../../types/book';
import { AppDispatch } from '../../../app/store';

type Props = {
  id: Book['id'];
  pages: VolumeInfo['pageCount'];
  isFinished: Book['isFinished'];
  book: Book;
};

export const ProgressBar: FC<Props> = React.memo(
  ({ id, pages, isFinished, book }) => {
    const [progress, setBarState] = useState<number>(book.progress);
    const savedValue = useRef<number>(progress);
    const dispatch: AppDispatch = useDispatch();
    const width: number = (progress / pages) * 100;

    function handleSetProgressLocal(e: React.ChangeEvent<HTMLInputElement>) {
      setBarState(Number(e.target.value));
    }

    function updateStateBook(newProgress: number) {
      dispatch(
        toggleBookFinished({
          id: id,
          progress: newProgress,
          pages: pages,
        })
      );
    }

    function handleSetProgressGlobal() {
      savedValue.current = progress;

      dispatch(setFinish({ id, value: progress === pages }));
      // dispatch(setFinish({ id, value: false }));

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
  }
);
