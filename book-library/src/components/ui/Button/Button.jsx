import c from '../ui.module.css';

export function Button({ isFinished, children }) {
  function handleSetStatus() {
    //dispatch
  }

  return (
    <button
      onClick={handleSetStatus}
      className={`${c.btnFinished}`}
      disabled={isFinished}
    >
      {children}
    </button>
  );
}
