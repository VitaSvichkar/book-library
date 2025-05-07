import c from './aside.module.css';

export function Aside({ children }) {
  return <aside className={c.aside}>{children}</aside>;
}
