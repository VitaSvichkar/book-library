import axios from 'axios';

function makeQuery(type, value) {
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
  value,
  type,
  index = 0,
  buffer = [],
  maxResult,
  maxRequest = 5
) => {
  let attempts = 0;
  let currentIndex = index;
  let newBooks = [...buffer];

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

    const data = res.data.items || [];

    const filteredData = data.filter((el) => {
      const isDuplicate = newBooks.some((book) => book.id === el.id);
      const { imageLinks, description, pageCount } = el.volumeInfo || {};

      return (
        imageLinks &&
        typeof description === 'string' &&
        description.length > 30 &&
        pageCount > 0 &&
        !isDuplicate
      );
    });

    const extendedBooks = filteredData.map((book) => ({
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

    if (data.length === 0) {
      break;
    }
  }

  return {
    booksToShow: newBooks.slice(0, maxResult),
    bufferLeft: newBooks.slice(maxResult),
    nextIndex: currentIndex,
  };
};
