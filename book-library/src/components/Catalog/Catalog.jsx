import c from './catalog.module.css';
import { Card } from '../Card/Card';
import { Button } from '../ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../features/fetchBooks';
import { getBooksState } from '../../features/booksSlice';
import { getKeyword } from '../../features/searchSlice';

export function Catalog() {
  const { list: books, totalItems, maxResult } = useSelector(getBooksState);
  const keyword = useSelector(getKeyword);
  const dispatch = useDispatch();

  function handleLoadData() {
    const newIndex = books.length;
    dispatch(fetchBooks(keyword, undefined, undefined, newIndex));
  }

  const restBooks =
    maxResult && totalItems
      ? (totalItems - books.length) / maxResult >= 1
      : false;

  return (
    <>
      {books.length > 0 ? (
        <div className={c.wrap}>
          <div className={c.books}>
            {books?.map((book) => {
              return (
                <Card
                  key={book.id}
                  book={book}
                  button={<Button isFinished={false}>Add</Button>}
                ></Card>
              );
            })}
          </div>

          {restBooks ? (
            <button className={c.btnLoadBooks} onClick={handleLoadData}>
              Load more
            </button>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
}
