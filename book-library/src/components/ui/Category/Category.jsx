import { useDispatch } from 'react-redux';
import c from './category.module.css';
import { fetchBooks } from '../../../features/fetchBooks';
import { setKeyword, setTypeQuery } from '../../../features/searchSlice';
import { setIsLoading } from '../../../features/booksSlice';

export function Category({ categories }) {
  const dispatch = useDispatch();

  function handleSearchCategory(e, category) {
    e.preventDefault();
    dispatch(setIsLoading({ type: 'search', value: true }));
    dispatch(setTypeQuery('category'));
    dispatch(setKeyword(category));
    dispatch(fetchBooks(category, 'category'));
  }

  return (
    <>
      {categories
        ? categories.map((category, i) => (
            <span
              className={c.category}
              onClick={(e) => handleSearchCategory(e, category)}
              key={i}
            >
              {category.toLowerCase()}
            </span>
          ))
        : ''}
    </>
  );
}
