import c from './card.module.css';
import bookCover from '../../../public/bookCover.jpg';
import { Badge } from './Badge';
import { ProgressBar } from './ProgressBar';
import { Grade } from './Grade';

export function Card({ status, pages = 200 }) {
  function handleSetStatus() {
    //dispatch
  }

  return (
    <div className={`${c.wrap}`}>
      <Badge status={status} />

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

          <ProgressBar pages={pages} />
          <Grade />

          <div className={c.wrapBtn}>
            <button onClick={handleSetStatus} className={c.btnFinished}>
              Finished
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
