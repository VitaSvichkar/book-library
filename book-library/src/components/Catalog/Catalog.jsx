import c from '../MyLibrary/myLibrary.module.css';
import { Card } from '../Card/Card';
import { Button } from '../ui/Button/Button';
import { useSelector } from 'react-redux';

export function Catalog() {
  const state = useSelector((state) => state.books.list);
  console.log(state);

  const arr = [
    {
      status: 'completed',
      isFinished: false,
    },
    {
      status: '',
      isFinished: false,
    },
    {
      status: 'completed',
      isFinished: false,
    },
    {
      isFinished: false,
      status: 'reading',
    },
    {
      isFinished: false,
      status: 'completed',
    },
    {
      status: '',
      isFinished: false,
    },
    {
      isFinished: false,
      status: '',
    },
    {
      status: 'completed',
      isFinished: false,
    },
    {
      status: 'reading',
      isFinished: false,
    },
    {
      status: 'reading',
      isFinished: false,
    },
  ];

  return (
    <div className={c.wrap}>
      {arr.map((el, i) => {
        return (
          <Card
            key={i}
            button={<Button isFinished={false}>Read</Button>}
          ></Card>
        );
      })}
    </div>
  );
}
