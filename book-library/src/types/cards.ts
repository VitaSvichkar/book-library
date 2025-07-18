import { Book } from './book';
import { QueryTypes } from './searchSlice';

export type CardWrapperProps = {
  book: Book;
  handleOpenModal: (e: React.MouseEvent, book: Book, classes: Classes) => void;
  isMyLibrary: boolean;
  limitBooks?: boolean;
  setIsLoading?: (val: boolean) => void;
};

export type Classes = {
  authorLink: string;
  categories: string;
  wrapLabel: string;
  wrapStar: string;
  btn: string;
};

export type CardProps = {
  handleDeleteBook: () => void;
  handleToggleFinish: () => void;
  handleToggleFavorite: () => void;
  handleSearchTags: (
    e: React.MouseEvent,
    keyWord: string,
    type: QueryTypes
  ) => void;
  handleToggleAddBook: () => void;
  limitBooks: CardWrapperProps['limitBooks'];
  book: CardWrapperProps['book'];
  classes: Classes;
  author: string;
  category: string;
  bookCover: string;
  title: string;
};
