import { Card } from './Card';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  addBook,
  removeBook,
  setFinish,
  setIsFavorite,
} from '../../features/myBooksSlice';
import { setIsAdded, setIsLoading } from '../../features/booksSlice';
import { setKeyword, setTypeQuery } from '../../features/searchSlice';
import { fetchBooks } from '../../features/fetchBooks';

export const CardWrapper = React.memo(
  ({ book, handleOpenModal, i, isMyLibrary, limitBooks }) => {
    console.log('CARD wrapper');
    const dispatch = useDispatch();

    const handleSearchAuthor = useCallback(
      (e, el) => {
        console.log('search author');
        e.preventDefault();
        dispatch(setIsLoading({ type: 'search', value: true }));
        dispatch(setTypeQuery('author'));
        dispatch(setKeyword(el));
        dispatch(fetchBooks(el, 'author'));
      },
      [dispatch]
    );

    const handleToggleFavorite = useCallback(() => {
      console.log('toggle favorite');
      dispatch(setIsFavorite(book.id));
    }, [dispatch, book.id]);

    const handleToggleFinish = useCallback(() => {
      console.log('toggle finish');
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
      console.log('delete book');
      dispatch(removeBook(book.id));
      dispatch(setIsAdded(book.id));
    }, [dispatch, book.id]);

    return (
      <Card
        book={book}
        handleOpenModal={handleOpenModal}
        handleSearchAuthor={handleSearchAuthor}
        handleDeleteBook={handleDeleteBook}
        handleToggleFinish={handleToggleFinish}
        handleToggleAddBook={handleToggleAddBook}
        handleToggleFavorite={handleToggleFavorite}
        limitBooks={limitBooks}
        i={i}
        isMyLibrary={isMyLibrary}
      />
    );
  }
);
