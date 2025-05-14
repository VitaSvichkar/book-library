import { setBooks, setTotalItems } from './booksSlice';
import axios from 'axios';

export const fetchBooks = (keyword, starIndex) => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/books', {
      params: {
        q: keyword.trim().toLowerCase(),
        startIndex: starIndex,
      },
    });
    dispatch(setBooks(res.data.items));
    dispatch(setTotalItems(res.data.totalItems));
  } catch (error) {
    console.error('Error :(', error);
  }
};
