import { NavLink } from 'react-router-dom';
import c from './myLibraryNavigation.module.css';
import { getFilterType } from '../../features/myBooksSlice';
import { useSelector } from 'react-redux';

export function MyLibraryNavigation() {
  const filter = useSelector(getFilterType);

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
    return isActive ? c.active : c.link;
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
