import { NavLink } from 'react-router-dom';
import c from './navigation.module.css';

export function Navigation() {
  return (
    <nav className={c.navMain}>
      <ul className={c.list}>
        <li className={c.item}>
          <NavLink
            className={({ isActive }) => (isActive ? c.active : c.link)}
            to="/"
          >
            My Library
          </NavLink>
        </li>
        <li className={c.item}>
          <NavLink
            className={({ isActive }) => (isActive ? c.active : c.link)}
            to="catalog"
          >
            Сatalog
          </NavLink>
        </li>
        <li className={c.item}>
          <NavLink
            className={({ isActive }) => (isActive ? c.active : c.link)}
            to="str"
          >
            str
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
