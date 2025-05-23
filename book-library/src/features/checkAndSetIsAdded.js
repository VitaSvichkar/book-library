export default function checkAndSetIsAdded(myAddedBooks, booksToShow) {
  const saveIds = new Set(myAddedBooks.map((book) => book.id));
  return booksToShow.map((book) => {
    return { ...book, isAdded: saveIds.has(book.id) };
  });
}
