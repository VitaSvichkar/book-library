import c from './category.module.css';

export function Category({ categories }) {
  return (
    <div className={c.category}>
      {categories ? categories.map((el, i) => <span key={i}>{el}</span>) : ''}
    </div>
  );
}
