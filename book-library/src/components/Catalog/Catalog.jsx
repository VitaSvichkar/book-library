import c from './catalog.module.css';
import { Card } from '../Card/Card';
import { Button } from '../ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksState, setIsLoading } from '../../features/booksSlice';
import { getKeyword } from '../../features/searchSlice';
import { loadMoreBooks } from '../../features/loadMoreBooks';

export function Catalog() {
  const { list: books, buffer, isLoading } = useSelector(getBooksState);
  const keyword = useSelector(getKeyword);
  const dispatch = useDispatch();

  function handleLoadData() {
    dispatch(setIsLoading()); //true
    dispatch(loadMoreBooks(keyword));
  }

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

          {buffer.length > 0 ? (
            <button
              disabled={isLoading}
              className={c.btnLoadBooks}
              onClick={handleLoadData}
            >
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
