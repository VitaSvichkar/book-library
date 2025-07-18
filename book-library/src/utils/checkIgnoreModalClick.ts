import { Classes } from '../types/cards';

export function checkIgnoreModalClick(
  e: React.MouseEvent,
  c: Classes
): boolean {
  const target = e.target as HTMLElement;
  if (
    target.closest(`.${c.authorLink}`) ||
    target.closest(`.${c.categories}`) ||
    target.closest(`.${c.btn}`) ||
    target.closest(`.${c.wrapLabel}`) ||
    target.closest(`.${c.wrapStar}`)
  ) {
    return false;
  } else {
    return true;
  }
}
