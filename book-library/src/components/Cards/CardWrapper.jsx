import c from './cards.module.css';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  addBook,
  removeBook,
  setFinish,
  setIsFavorite,
} from '../../features/myBooksSlice';
import { setIsAdded } from '../../features/booksSlice';
import { setKeyword, setTypeQuery } from '../../features/searchSlice';
import { fetchBooks } from '../../features/fetchBooks';
import { LibraryCard } from './LibraryCard/LibraryCard';
import { CatalogCard } from './CatalogCard/CatalogCard';

export const CardWrapper = React.memo(
  ({ book, handleOpenModal, isMyLibrary, limitBooks, setIsLoading }) => {
    const dispatch = useDispatch();

    const title = book.volumeInfo.title.toLowerCase();
    const category = book.volumeInfo.categories
      ?.slice(0, 1)
      .join()
      .toLowerCase();
    const author = book.volumeInfo.authors?.slice(0, 1).join().toLowerCase();
    const bookCover = book.volumeInfo.imageLinks.thumbnail.replace(
      /^http:\/\//i,
      'https://'
    );

    const classes = {
      authorLink: c.authorLink,
      categories: c.categories,
      wrapLabel: c.wrapLabel,
      wrapStar: c.wrapStar,
      btn: c.btn,
    };

    const handleSearchTags = useCallback(
      async (e, el, type) => {
        e.preventDefault();
        setIsLoading(true);

        try {
          dispatch(setTypeQuery(type));
          dispatch(setKeyword(el));
          await dispatch(fetchBooks(el, type));
          setIsLoading(false);
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

    const props = {
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
