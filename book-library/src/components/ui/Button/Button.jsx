import c from '../ui.module.css';

export function Button({ onClick, children, className }) {
  return (
    <button onClick={onClick} className={`${c.btn} ${c[className]} `}>
      <span className={className}>{children}</span>
    </button>
  );
}
