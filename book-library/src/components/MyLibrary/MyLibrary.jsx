import c from './myLibrary.module.css';

export function MyLibrary() {
  const arr = [
    {
      status: 'completed',
    },
    {
      status: '',
    },
    {
      status: 'completed',
    },
    {
      status: 'reading',
    },
    {
      status: 'completed',
    },
    {
      status: '',
    },
    {
      status: '',
    },
    {
      status: 'completed',
    },
    {
      status: 'reading',
    },
    {
      status: 'reading',
    },
  ];

  function getStatusClass(status) {
    return status === 'reading' || status === 'completed' ? status : '';
  }

  return (
    <div className={c.wrap}>
      {arr.map((el, i) => {
        const status = getStatusClass(el?.status);
        // return <Card />;
      })}
    </div>
  );
}
