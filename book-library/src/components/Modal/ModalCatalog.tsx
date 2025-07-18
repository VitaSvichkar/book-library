import { FC } from 'react';
import { BookData } from './BookData';
import c from './modal.module.css';
import { ModalProps } from '../../types/modalProps';

export const ModalCatalog: FC<ModalProps> = ({ book, handleCloseModal }) => {
  return (
    <div className={c.overlay} onClick={handleCloseModal}>
      <article className={c.modal}>
        <BookData book={book!.volumeInfo} />

        <section className={c.aboutBook}>
          <h2>About book</h2>
          <p>{book!.volumeInfo.description}</p>
        </section>
      </article>
    </div>
  );
};
