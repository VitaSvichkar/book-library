import c from './modal.module.css';
import { useDispatch } from 'react-redux';

import { useState } from 'react';
import { setReview } from '../../features/myBooksSlice';

export function ModalMyLibrary({ book, handleCloseModal }) {
  const {
    volumeInfo: {
      authors,
      imageLinks,
      pageCount,
      title,
      publisher,
      publishedDate,
      previewLink,
    },
  } = book || {};
  console.log('modal my library');
  const bookСover = imageLinks?.smallThumbnail;
  const [myReview, setMyReview] = useState(book.review);
  const dispatch = useDispatch();

  function handleSaveReview(e) {
    console.log('save review', myReview);
    e.preventDefault();
    dispatch(setReview({ id: book.id, review: myReview }));
  }

  function handleSetReview(e) {
    console.log('review');
    setMyReview(e.target.value);
  }

  return (
    <div className={c.overlay} onClick={(e) => handleCloseModal(e)}>
      <article className={c.modal}>
        <h1>{title}</h1>
        <div className={c.wrap}>
          <div className={c.bookCover}>
            <img src={bookСover} alt="#" />
          </div>
          <div className={c.wrapBookMeta}>
            <table className={c.bookMeta}>
              <tbody>
                {authors.length > 0 && (
                  <tr>
                    <th>Author</th>
                    <td>{authors.join(', ').toLowerCase()}</td>
                  </tr>
                )}

                {publisher && (
                  <tr>
                    <th>Publisher</th>
                    <td>{publisher.toLowerCase()}</td>
                  </tr>
                )}

                {publishedDate && (
                  <tr>
                    <th>Year</th>
                    <td>{publishedDate}</td>
                  </tr>
                )}

                {typeof pageCount === 'number' && pageCount > 0 && (
                  <tr>
                    <th>Page count</th>
                    <td>{pageCount}</td>
                  </tr>
                )}

                {previewLink && (
                  <tr>
                    <th>Preview</th>
                    <td>
                      <a href={previewLink}>Open me</a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <section>
          <h2>Review</h2>
          <form onSubmit={handleSaveReview} className={c.form}>
            <textarea
              className={c.textarea}
              onChange={handleSetReview}
              placeholder="Share your thoughts about the book..."
              name="review"
              maxLength={1000}
              value={myReview}
            ></textarea>
            <button className={c.btnSave}>save</button>
          </form>
        </section>
      </article>
    </div>
  );
}
