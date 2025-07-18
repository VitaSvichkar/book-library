import { Book } from './book';

export type ModalProps = {
  book: Book | null;
  handleCloseModal: (e: React.MouseEvent) => void;
};
