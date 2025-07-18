import React, { FC } from 'react';
import c from '../ui.module.css';
import { StatusValues } from '../../../types/book';

export const Badge = React.memo(({ status }: { status: StatusValues }) => {
  return (
    <span className={`${c.badge} ${c[status]}`}>
      {status !== ''
        ? status.charAt(0).toUpperCase() + status.slice(1)
        : 'To read'}
    </span>
  );
});
