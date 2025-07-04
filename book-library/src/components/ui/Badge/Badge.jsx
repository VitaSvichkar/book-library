import React from 'react';
import c from '../ui.module.css';

export const Badge = React.memo(({ status }) => {
  return (
    <span className={`${c.badge} ${c[status]}`}>
      {status ? status.at(0).toUpperCase() + status.slice(1) : 'To read'}
    </span>
  );
});
