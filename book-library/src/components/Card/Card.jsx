import { useDispatch } from 'react-redux';
import { openModal } from '../../features/modalSlice';
import { Category } from '../ui/Category/Category';
import c from './card.module.css';

export function Card({ badge, progressBar, grade, button, book }) {
  const {
    volumeInfo: { authors, imageLinks, categories, title },
  } = book || {};

  const bookСover = imageLinks?.smallThumbnail;
  const dispatch = useDispatch();

  function handleOpenModal(book) {
    dispatch(openModal(book));
  }

  return (
    <div className={c.wrap} onClick={() => handleOpenModal(book)}>
      {badge}

      <div className={c.cardInfo}>
        <div className={c.bookСover}>
          <img src={bookСover || ''} alt="#" />
        </div>

        <div className={c.cardDescription}>
          <h2 title={title}>{title}</h2>
          <p className={c.author}>
            {authors?.slice(0, 2).join(', ')}
            {authors?.length > 2 && '.. '}
          </p>

          <Category categories={categories} />
          {progressBar}
          {grade}
          <div className={c.wrapBtn}>{button}</div>
        </div>
      </div>
    </div>
  );
}
