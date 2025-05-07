import c from './search.module.css';

export function Search() {
  return (
    <form>
      <div className={c.search}>
        <input maxLength="50" placeholder="search" />
        <button>
          <img src="../public/ico-search.png" alt="#" width="20" />
        </button>
      </div>
    </form>
  );
}
