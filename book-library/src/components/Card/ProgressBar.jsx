import { useState } from 'react';
import c from './card.module.css';

export function ProgressBar({ pages }) {
  const [barState, setBarState] = useState({ width: 0, progress: 0 });

  function handleSetProgress(e) {
    const value = e.target.value;

    setBarState((prevState) => ({
      ...prevState,
      width: (value / pages) * 100,
      progress: value,
    }));
  }

  return (
    <div className={c.wrapLabel}>
      <label className={c.labelProgress}>
        <input
          onChange={handleSetProgress}
          type="range"
          min="0"
          max={pages}
          value={barState.progress}
        />
        <div style={{ width: barState.width + '%' }}></div>
      </label>
      {/* <label>
        <input type="text" />
      </label> */}
      <span>{barState.progress}</span>
    </div>
  );
}
