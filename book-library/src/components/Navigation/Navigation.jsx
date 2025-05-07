import { NavLink } from 'react-router-dom';
import c from './navigation.module.css';

export function Navigation() {
  return (
    <nav className={c.navMain}>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? c.active : '')}
            to="/"
          >
            My Library
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? c.active : '')}
            to="catalog"
          >
            Сatalog
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? c.active : '')}
            to="str"
          >
            str
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
