import c from './catalog.module.css';
import { Card } from '../Card/Card';
import { Button } from '../ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchBooks } from '../../features/fetchBooks';

export function Catalog() {
  const books = useSelector((state) => state.books.list);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks(page));
  }, [page, dispatch]);

  function handleLoadData() {
    const newIndex = books.length;
    setPage(newIndex);
  }

  return (
    <div className={c.wrap}>
      {books?.map((book) => {
        return (
          <Card
            key={book.id}
            book={book}
            button={<Button isFinished={false}>Add</Button>}
          ></Card>
        );
      })}
      <p onClick={handleLoadData}>load more</p>
    </div>
  );
}
