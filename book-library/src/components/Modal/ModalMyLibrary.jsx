import c from './modal.module.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setReview } from '../../features/myBooksSlice';
import { BookData } from './BookData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export function ModalMyLibrary({ book, handleCloseModal }) {
  console.log('modal my library');

  const [myReview, setMyReview] = useState(book.review);
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(null);

  function handleSaveReview(e) {
    e.preventDefault();
    setIsSaved(dispatch(setReview({ id: book.id, review: myReview })));
  }

  function handleSetReview(e) {
    if (isSaved) {
      setIsSaved(null);
    }

    setMyReview(e.target.value);
  }

  return (
    <div className={c.overlay} onClick={(e) => handleCloseModal(e)}>
      <article className={c.modal}>
        <BookData book={book.volumeInfo} />

        <section>
          <h2>Review</h2>

          <form onSubmit={handleSaveReview} className={c.form}>
            <textarea
              className={c.textarea}
              onChange={handleSetReview}
              placeholder="Share your thoughts about the book..."
              maxLength={1000}
              value={myReview}
            ></textarea>

            <button
              className={`${isSaved ? c.messageInfo : c.btnSave}`}
              disabled={isSaved}
            >
              {isSaved ? <FontAwesomeIcon icon={faCircleCheck} /> : 'save'}
            </button>
          </form>
        </section>
      </article>
    </div>
  );
}
