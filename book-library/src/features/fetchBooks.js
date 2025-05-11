import { setBooks } from './booksSlice';
import axios from 'axios';

export const fetchBooks = (page) => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/books', {
      params: {
        q: 'react',
        startIndex: page,
      },
    });
    dispatch(setBooks(res.data.items));
  } catch (error) {
    console.error('Error :(', error);
  }
};
