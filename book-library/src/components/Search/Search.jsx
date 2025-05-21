import c from './search.module.css';
import {
  getKeyword,
  getType,
  setKeyword,
  setLastKeyword,
  setTypeQuery,
} from '../../features/searchSlice';
import { fetchBooks } from '../../features/fetchBooks';
import { getBooksState, setIsLoading } from '../../features/booksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Loading } from '../ui/Loading/Loading';

export function Search() {
  const keyword = useSelector(getKeyword);
  const { list: books, isLoading } = useSelector(getBooksState);
  const type = useSelector(getType);
  const dispatch = useDispatch();
  const [isRequest, setIsRequest] = useState(false);

  function handleSetValue(e) {
    dispatch(setKeyword(e.target.value));
  }

  function handleSetSearchType(value) {
    dispatch(setLastKeyword(''));
    dispatch(setTypeQuery(value));
  }

  function handleSetFetch(e) {
    const formData = new FormData(e.target);
    const currentType = formData.get('searchType');
    e.preventDefault();
    dispatch(setIsLoading({ type: 'search', value: true }));
    dispatch(fetchBooks(keyword, currentType));
    dispatch(setTypeQuery(currentType));
    setIsRequest(true);
  }

  function placeholderText() {
    switch (type) {
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
            name="searchType"
            value={type}
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
            autoFocus
            value={keyword}
          />
          <button>
            <img src="../public/ico-search.png" alt="#" width="25" />
          </button>
        </div>
      </form>
      {isLoading.search && <Loading />}
      {isRequest && !isLoading.search && books.length < 1 && (
        <p className={c.infoMessage}>
          We couldn't find anything. Maybe try another keyword? 😸
        </p>
      )}
    </>
  );
}
