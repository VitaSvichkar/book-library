import React from 'react';
import c from '../ui.module.css';

export const Badge = React.memo(({ status }) => {
  console.log('badge');
  return (
    <span className={`${c.badge} ${c[status]}`}>
      {status ? status[0].toUpperCase() + status.slice(1) : 'To read'}
    </span>
  );
});
