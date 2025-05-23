import c from './myLibrary.module.css';
import { Card } from '../Card/Card';
import { Badge } from '../ui/Badge/Badge';
import { ProgressBar } from '../ui/ProgressBar/ProgressBar';
import { Grade } from '../ui/Grade/Grade';
import { Button } from '../ui/Button/Button';
import { Aside } from '../Aside/Aside';
import { MyLibraryNavigation } from '../MyLibraryNavigation/MyLibraryNavigation';
import { useSelector } from 'react-redux';
import { getMyBooks } from '../../features/myBooksSlice';

export function MyLibrary() {
  const myBooks = useSelector(getMyBooks);

  function getStatusClass(status) {
    return status === 'reading' || status === 'completed' ? status : '';
  }

  return (
    <div className={c.wrap}>
      <Aside>
        <MyLibraryNavigation />
      </Aside>

      <div className={c.wrapBooks}>
        {myBooks.length > 0 &&
          myBooks.map((book) => {
            const status = getStatusClass(book.status);

            return (
              <Card
                key={book.id}
                badge={<Badge status={status} />}
                progressBar={<ProgressBar pages={book.volumeInfo?.pageCount} />}
                grade={<Grade />}
                button={<Button />}
                book={book}
              />
            );
          })}
      </div>
    </div>
  );
}
