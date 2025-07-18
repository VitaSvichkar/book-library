import c from './cards.module.css';
import React, { useCallback, FC } from 'react';
import { useDispatch } from 'react-redux';
import { setIsAdded } from '../../features/booksSlice';
import { setKeyword, setTypeQuery } from '../../features/searchSlice';
import { fetchBooks } from '../../features/fetchBooks';
import { LibraryCard } from './LibraryCard/LibraryCard';
import { CatalogCard } from './CatalogCard/CatalogCard';
import { CardProps, CardWrapperProps, Classes } from '../../types/cards';
import {
  addBook,
  removeBook,
  setFinish,
  setIsFavorite,
} from '../../features/myBooksSlice';
import { QueryTypes } from '../../types/searchSlice';
import { AppDispatch } from '../../app/store';

export const CardWrapper: FC<CardWrapperProps> = React.memo(
  ({ book, handleOpenModal, isMyLibrary, limitBooks, setIsLoading }) => {
    const dispatch: AppDispatch = useDispatch();

    const title: string = book.volumeInfo.title.toLowerCase();

    const category: string = book.volumeInfo.categories
      ?.slice(0, 1)
      .join()
      .toLowerCase();
    const author: string = book.volumeInfo.authors
      ?.slice(0, 1)
      .join()
      .toLowerCase();
    const bookCover: string = book.volumeInfo.imageLinks.thumbnail.replace(
      /^http:\/\//i,
      'https://'
    );

    const classes: Classes = {
      authorLink: c.authorLink,
      categories: c.categories,
      wrapLabel: c.wrapLabel,
      wrapStar: c.wrapStar,
      btn: c.btn,
    };

    const handleSearchTags = useCallback(
      async (
        e: React.MouseEvent,
        keyWord: string,
        type: QueryTypes
      ): Promise<void> => {
        e.preventDefault();
        setIsLoading!(true);

        try {
          dispatch(setTypeQuery(type));
          dispatch(setKeyword(keyWord));
          await dispatch(fetchBooks(keyWord, type));
          setIsLoading!(false);
        } catch (error) {
          console.log(error);
        }
      },
      [dispatch, setIsLoading]
    );

    const handleToggleFavorite = useCallback(() => {
      dispatch(setIsFavorite(book.id));
    }, [dispatch, book.id]);

    const handleToggleFinish = useCallback(() => {
      book.isFinished
        ? dispatch(setFinish({ id: book.id, value: false }))
        : dispatch(setFinish({ id: book.id, value: true }));
    }, [dispatch, book.id, book.isFinished]);

    const handleToggleAddBook = useCallback(() => {
      if (limitBooks && !book.isAdded) {
        return;
      }

      book.isAdded ? dispatch(removeBook(book.id)) : dispatch(addBook(book));
      dispatch(setIsAdded(book.id));
    }, [dispatch, book.id, book.isAdded, limitBooks]);

    const handleDeleteBook = useCallback(() => {
      dispatch(removeBook(book.id));
      dispatch(setIsAdded(book.id));
    }, [dispatch, book.id]);

    const props: CardProps = {
      handleDeleteBook,
      handleToggleFinish,
      handleToggleFavorite,
      handleSearchTags,
      handleToggleAddBook,
      limitBooks,
      book,
      classes,
      author,
      category,
      bookCover,
      title,
    };

    return (
      <article
        className={c.wrap}
        onClick={(e) => handleOpenModal(e, book, classes)}
      >
        {isMyLibrary ? <LibraryCard {...props} /> : <CatalogCard {...props} />}
      </article>
    );
  }
);
