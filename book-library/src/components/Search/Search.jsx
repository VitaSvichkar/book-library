import c from './search.module.css';
import { getKeyword, setKeyword } from '../../features/searchSlice';
import { fetchBooks } from '../../features/fetchBooks';
import { clearBooks, getBooksState } from '../../features/booksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export function Search() {
  const keyword = useSelector(getKeyword);
  const { list: books } = useSelector(getBooksState);
  const dispatch = useDispatch();
  const [isRequest, setIsRequest] = useState(false);

  function handleSetValue(e) {
    dispatch(setKeyword(e.target.value));
  }

  function handleSetFetch(e) {
    e.preventDefault();
    dispatch(fetchBooks(keyword, 0));
    dispatch(clearBooks());
    setIsRequest(true);
  }

  return (
    <>
      <form onSubmit={handleSetFetch}>
        <div className={c.search}>
          <input
            onChange={handleSetValue}
            maxLength="70"
            placeholder="enter the book title"
            autoFocus
            value={keyword}
          />
          <button>
            <img src="../public/ico-search.png" alt="#" width="25" />
          </button>
        </div>
      </form>

      {isRequest && books.length < 1 && (
        <p className={c.infoMessage}>
          We couldn't find anything. Maybe try another keyword? 😸
        </p>
      )}
    </>
  );
}
