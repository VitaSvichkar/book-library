import { FC } from 'react';
import c from './loadMoreButton.module.css';

type ButtonProps = {
  onClick: () => Promise<void>;
  isLoading: boolean;
};

export const LoadMoreButton: FC<ButtonProps> = ({ onClick, isLoading }) => {
  return (
    <button className={c.btnLoadBooks} disabled={isLoading} onClick={onClick}>
      load moooore books
    </button>
  );
};
