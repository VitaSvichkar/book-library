import c from './catalog.module.css';
import { Card } from '../Card/Card';
import { Button } from '../ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksState, setIsLoading } from '../../features/booksSlice';
import { getKeyword } from '../../features/searchSlice';
import { loadMoreBooks } from '../../features/loadMoreBooks';
import { Loading } from '../ui/Loading/Loading';

export function Catalog() {
  const { list: books, buffer, isLoading } = useSelector(getBooksState);
  const keyword = useSelector(getKeyword);
  const dispatch = useDispatch();

  function handleLoadData() {
    dispatch(setIsLoading({ type: 'loadMore', value: true }));
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
          {isLoading.loadMore && <Loading />}
          {buffer.length > 0 && !isLoading.loadMore ? (
            <button
              disabled={isLoading.loadMore}
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
