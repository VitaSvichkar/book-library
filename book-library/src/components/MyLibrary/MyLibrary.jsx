import c from './myLibrary.module.css';
import { Card } from '../Card/Card';
import { Badge } from '../ui/Badge/Badge';
import { ProgressBar } from '../ui/ProgressBar/ProgressBar';
import { Grade } from '../ui/Grade/Grade';
import { Button } from '../ui/Button/Button';

export function MyLibrary() {
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

  function getStatusClass(status) {
    return status === 'reading' || status === 'completed' ? status : '';
  }

  return (
    <div className={c.wrap}>
      {arr.map((el, i) => {
        const status = getStatusClass(el?.status);

        return (
          <Card
            key={i}
            badge={<Badge status={status} />}
            progressBar={<ProgressBar pages={200} />}
            grade={<Grade />}
            button={<Button isFinished={false}>Finished</Button>}
          />
        );
      })}
    </div>
  );
}
