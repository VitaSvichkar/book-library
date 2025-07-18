import c from './modal.module.css';
import { useDispatch } from 'react-redux';
import { FC, useState } from 'react';
import { setReview } from '../../features/myBooksSlice';
import { BookData } from './BookData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { ModalProps } from '../../types/modalProps';
import { AppDispatch } from '../../app/store';

export const ModalMyLibrary: FC<ModalProps> = ({ book, handleCloseModal }) => {
  const [myReview, setMyReview] = useState<string>(book!.review);
  const dispatch: AppDispatch = useDispatch();
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSaveReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setReview({ id: book!.id, review: myReview }));
    setIsSaved(true);
  };

  function handleSetReview(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (isSaved) {
      setIsSaved(false);
    }

    setMyReview(e.target.value);
  }

  return (
    <div className={c.overlay} onClick={(e) => handleCloseModal(e)}>
      <article className={c.modal}>
        <BookData book={book!.volumeInfo} />

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
};
