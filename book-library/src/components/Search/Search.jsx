import c from './search.module.css';

export function Search() {
  return (
    <form>
      <div className={c.search}>
        <input maxLength="70" placeholder="search" autoFocus />
        <button>
          <img src="../public/ico-search.png" alt="#" width="25" />
        </button>
      </div>
    </form>
  );
}
