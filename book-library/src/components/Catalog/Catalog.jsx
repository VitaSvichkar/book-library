import c from './catalog.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Card } from '../Card/Card';
import { Button } from '../ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBooksState,
  setIsAdded,
  setIsLoading,
} from '../../features/booksSlice';
import { getKeyword } from '../../features/searchSlice';
import { loadMoreBooks } from '../../features/loadMoreBooks';
import { Loading } from '../ui/Loading/Loading';
import { Search } from '../Search/Search';
import { addBook, removeBook } from '../../features/myBooksSlice';
import { useState } from 'react';

export function Catalog() {
  const { books, buffer, isLoading } = useSelector(getBooksState);
  const keyword = useSelector(getKeyword);
  const dispatch = useDispatch();

  function handleLoadData() {
    dispatch(setIsLoading({ type: 'loadMore', value: true }));
    dispatch(loadMoreBooks(keyword));
  }

  function handleAddBook(book) {
    console.log(book);
    book.isAdded ? dispatch(removeBook(book.id)) : dispatch(addBook(book));
    dispatch(setIsAdded(book.id));
  }

  console.log('catalog');
  return (
    <>
      <Search />
      <main className={c.main}>
        {books.length > 0 ? (
          <div className={c.wrap}>
            <div className={c.books}>
              {books?.map((book) => {
                return (
                  <Card
                    key={book.id}
                    book={book}
                    button={
                      <Button
                        onClick={() => handleAddBook(book)}
                        className={book.isAdded ? 'btnAdded' : 'btnAdd'}
                      >
                        {book.isAdded ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          <FontAwesomeIcon icon={faPlus} />
                        )}
                      </Button>
                    }
                  ></Card>
                );
              })}
            </div>
            {isLoading.loadMore && <Loading />}
            {buffer.length > 0 && !isLoading.loadMore ? (
              <button
                disabled={isLoading.loadMore}
                className={c.btnLoadBooks}
                onClick={handleLoadData}
              >
                Load more
              </button>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
      </main>
    </>
  );
}
