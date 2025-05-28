import React from 'react';
import c from '../ui.module.css';

export const Button = React.memo(({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${c.btn} ${className ? c[className] : ''}`}
    >
      <span className={className}>{children}</span>
    </button>
  );
});
