import { useDispatch } from 'react-redux';
import { openModal } from '../../features/modalSlice';
import { Category } from '../ui/Category/Category';
import c from './card.module.css';
import { fetchBooks } from '../../features/fetchBooks';
import { clearBooks } from '../../features/booksSlice';

export function Card({ badge, progressBar, grade, button, book }) {
  const {
    volumeInfo: { authors, imageLinks, categories, title },
  } = book || {};

  const sliceAuthors = authors?.slice(0, 2);
  const bookСover = imageLinks?.smallThumbnail;
  const dispatch = useDispatch();

  function handleOpenModal(e, book) {
    if (
      e.target.closest(`.${c.author}`) ||
      e.target.closest(`.${c.categories}`)
    ) {
      return;
    }
    dispatch(openModal(book));
  }

  function handleSearchAuthor(e, el) {
    e.preventDefault();
    dispatch(clearBooks());
    dispatch(fetchBooks(undefined, el, undefined, 0));
  }

  return (
    <div className={c.wrap} onClick={(e) => handleOpenModal(e, book)}>
      {badge}

      <div className={c.cardInfo}>
        <div className={c.bookСover}>
          <img src={bookСover || ''} alt="#" />
        </div>

        <div className={c.cardDescription}>
          <h2 title={title}>{title}</h2>
          <p className={c.authors}>
            {sliceAuthors?.map((el, i) => (
              <span
                onClick={(e) => handleSearchAuthor(e, el)}
                className={c.author}
                key={i}
              >
                {el}
              </span>
            ))}
          </p>

          <div className={c.categories}>
            <Category categories={categories} />
          </div>
          {progressBar}
          {grade}
          <div className={c.wrapBtn}>{button}</div>
        </div>
      </div>
    </div>
  );
}
