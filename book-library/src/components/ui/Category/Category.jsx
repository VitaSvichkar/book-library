import c from './category.module.css';
import { useDispatch } from 'react-redux';
import { fetchBooks } from '../../../features/fetchBooks';
import { setKeyword, setTypeQuery } from '../../../features/searchSlice';

export function Category({ categories, setIsLoading }) {
  const dispatch = useDispatch();

  async function handleSearchCategory(e, category) {
    e.preventDefault();
    setIsLoading(true);

    try {
      dispatch(setTypeQuery('category'));
      dispatch(setKeyword(category));
      await dispatch(fetchBooks(category, 'category'));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {categories &&
        categories.map((category, i) => (
          <span
            className={c.category}
            onClick={(e) => handleSearchCategory(e, category)}
            key={i}
          >
            {category.toLowerCase()}
          </span>
        ))}
    </>
  );
}
