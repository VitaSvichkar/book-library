import { setBooks, setTotalItems } from './booksSlice';
import axios from 'axios';

export const fetchBooks = (q, author, startIndex) => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/books', {
      params: {
        q,
        author,
        startIndex,
      },
    });
    dispatch(setBooks(res.data.items));
    dispatch(setTotalItems(res.data.totalItems));
  } catch (error) {
    console.error('Error :(', error);
  }
};
