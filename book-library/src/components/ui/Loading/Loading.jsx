import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import c from '../ui.module.css';

export function Loading() {
  return (
    <span className={c.icoLoading}>
      <FontAwesomeIcon icon={faSpinner} spin />
    </span>
  );
}
