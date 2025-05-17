import { useDispatch } from 'react-redux';
import c from './category.module.css';
import { fetchBooks } from '../../../features/fetchBooks';
import { clearBooks } from '../../../features/booksSlice';

export function Category({ categories }) {
  const dispatch = useDispatch();
  function handleSearchCategory(e, category) {
    e.preventDefault();

    console.log(category);
    dispatch(clearBooks());

    dispatch(fetchBooks(undefined, undefined, category, 0));
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
              {category}
            </span>
          ))
        : ''}
    </>
  );
}
