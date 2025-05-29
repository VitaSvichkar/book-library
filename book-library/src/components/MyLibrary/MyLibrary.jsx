import c from './myLibrary.module.css';
import { useSelector } from 'react-redux';
import { getMyBooks } from '../../features/myBooksSlice';
import { CardWrapper } from '../Card/CardWrapper';

export function MyLibrary({ myLibraryNavigation }) {
  const myBooks = useSelector(getMyBooks);
  console.log('my library');
  return (
    <div className={c.wrap}>
      {myLibraryNavigation}

      <main className={c.wrapBooks}>
        {myBooks.length > 0 &&
          myBooks.map((book, i) => {
            return (
              <CardWrapper key={book.id} book={book} i={i} isMyLibrary={true} />
            );
          })}
      </main>
    </div>
  );
}
