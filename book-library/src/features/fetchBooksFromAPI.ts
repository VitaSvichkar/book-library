import axios from 'axios';
import { QueryTypes } from '../types/searchSlice';
import { Book, VolumeInfo } from '../types/book';

type Response = {
  booksToShow: Book[];
  bufferLeft: Book[];
  nextIndex: number;
};

function makeQuery(type: QueryTypes, value: string): string {
  switch (type) {
    case 'author':
      return `inauthor:"${value}"`;
    case 'title':
      return `intitle:"${value}"`;
    case 'category':
      return `subject:${value}`;
    default:
      return value;
  }
}

export const fetchBooksFromAPI = async (
  value: string,
  type: QueryTypes,
  index: number = 0,
  buffer: Book[] = [],
  maxResult: number,
  maxRequest: number = 5
): Promise<Response> => {
  let attempts: number = 0;
  let currentIndex: number = index;
  let newBooks: Book[] = [...buffer];

  while (newBooks.length < maxResult + 1 && attempts <= maxRequest) {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/books`,
      {
        params: {
          q: makeQuery(type, value),
          currentIndex,
        },
      }
    );

    const data = res.data.items;

    if (!Array.isArray(data)) break;

    const filteredData: Book[] = data.filter((el) => {
      const isDuplicate = newBooks.some((book) => book.id === el.id);
      const { imageLinks, description, pageCount }: VolumeInfo = el.volumeInfo;

      return (
        imageLinks &&
        typeof description === 'string' &&
        description.length > 30 &&
        pageCount > 0 &&
        !isDuplicate
      );
    });

    const extendedBooks: Book[] = filteredData.map((book) => ({
      ...book,
      isAdded: false,
      isFinished: false,
      isFavorite: false,
      status: '',
      review: '',
      progress: 0,
      grade: null,
    }));

    newBooks = [...newBooks, ...extendedBooks];
    currentIndex += maxResult;
    attempts += 1;

    if (data.length === 0) break;
  }

  return {
    booksToShow: newBooks.slice(0, maxResult),
    bufferLeft: newBooks.slice(maxResult),
    nextIndex: currentIndex,
  };
};
