import c from './modal.module.css';
import { closeModal } from '../../features/modalSlice';
import { useDispatch } from 'react-redux';

export function Modal({ book }) {
  const {
    volumeInfo: {
      authors,
      imageLinks,
      pageCount,
      title,
      description,
      publisher,
      publishedDate,
      previewLink,
    },
  } = book || {};

  const bookСover = imageLinks?.smallThumbnail;

  const dispatch = useDispatch();

  function handleCloseModal(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(closeModal());
  }

  return (
    <div className={c.overlay} onClick={handleCloseModal}>
      <article className={c.modal}>
        <h1>{title}</h1>
        <div className={c.wrap}>
          <div className={c.bookCover}>
            <img src={bookСover} alt="#" />
          </div>
          <div className={c.wrapBookMeta}>
            <table className={c.bookMeta}>
              <tbody>
                <tr>
                  <th>Author</th>
                  <td>{authors}</td>
                </tr>
                <tr>
                  <th>Publisher</th>
                  <td>{publisher}</td>
                </tr>
                <tr>
                  <th>Year</th>
                  <td>{publishedDate}</td>
                </tr>
                <tr>
                  <th>Page count</th>
                  <td>{pageCount}</td>
                </tr>
                <tr>
                  <th>Preview</th>
                  <td>
                    <a href={previewLink}>Open me</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <section className={c.aboutBook}>
          <h2>About book</h2>
          <p>{description}</p>
        </section>
      </article>
    </div>
  );
}
