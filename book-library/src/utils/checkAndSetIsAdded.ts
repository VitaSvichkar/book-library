import { Book } from '../types/book';

export default function checkAndSetIsAdded(
  myAddedBooks: Book[],
  booksToShow: Book[]
): Book[] {
  const saveIds: Set<string> = new Set(myAddedBooks.map((book) => book.id));

  return booksToShow.map((book) => {
    return { ...book, isAdded: saveIds.has(book.id) };
  });
}
