import c from './card.module.css';

export function Badge({ status }) {
  return (
    <span className={`${c.badge} ${c[status]}`}>
      {status ? status[0].toUpperCase() + status.slice(1) : 'To read'}
    </span>
  );
}
