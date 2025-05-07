import { NavLink, useLocation } from 'react-router-dom';
import c from './myLibraryNavigation.module.css';

export function MyLibraryNavigation() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const filter = query.get('filter');
  const navigationLinks = [
    {
      title: 'All books',
    },
    {
      title: 'My Favorites',
      query: 'favorite',
    },
    {
      title: 'Already Read',
      query: 'read',
    },
    {
      title: 'Reading Now',
      query: 'reading',
    },
  ];

  function getLinkClass(query) {
    const isActive = query ? query === filter : !filter;
    return isActive ? c.active : '';
  }

  return (
    <nav className={c.navCatalog}>
      <ul>
        {navigationLinks.map((el, i) => (
          <li key={i}>
            <NavLink
              className={getLinkClass(el?.query)}
              to={el?.query ? `?filter=${el?.query}` : '/'}
            >
              {el?.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
