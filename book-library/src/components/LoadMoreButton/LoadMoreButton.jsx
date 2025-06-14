import c from './loadMoreButton.module.css';

export default function LoadMoreButton({ onClick, isLoading }) {
  return (
    <button className={c.btnLoadBooks} disabled={isLoading} onClick={onClick}>
      load moooore books
    </button>
  );
}
