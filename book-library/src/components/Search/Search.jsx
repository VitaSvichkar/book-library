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
  const [searchType, setSearchType] = useState('author');

  function handleSetValue(e) {
    dispatch(setKeyword(e.target.value));
  }

  function handleSetSearchType(value) {
    setSearchType(value);
  }

  function handleSetFetch(e) {
    e.preventDefault();

    switch (searchType) {
      case 'author':
        dispatch(fetchBooks(undefined, keyword, undefined, 0));
        break;
      case 'category':
        dispatch(fetchBooks(undefined, undefined, keyword, 0));
        break;
      default:
        dispatch(fetchBooks(keyword, undefined, undefined, 0));
    }

    dispatch(clearBooks());
    setIsRequest(true);
  }

  function placeholderText() {
    switch (searchType) {
      case 'author':
        return 'e.g., John Fowles, Rowling';

      case 'category':
        return 'e.g., Fiction, History, Science';

      default:
        return 'e.g., Harry Potter, The Godfather';
    }
  }

  return (
    <>
      <form className={c.form} onSubmit={handleSetFetch}>
        <div className={c.wrapSelect}>
          <select
            value={searchType}
            className={c.select}
            onChange={(e) => handleSetSearchType(e.target.value)}
          >
            <option value="author">Search by author</option>
            <option value="title">Search by title</option>
            <option value="category">Search by category</option>
          </select>
        </div>

        <div className={c.search}>
          <input
            onChange={handleSetValue}
            maxLength="70"
            placeholder={placeholderText()}
            // placeholder={'jj'}
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
