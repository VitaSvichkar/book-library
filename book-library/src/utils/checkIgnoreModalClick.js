export function checkIgnoreModalClick(e, c) {
  if (
    e.target.closest(`.${c.authorLink}`) ||
    e.target.closest(`.${c.categories}`) ||
    e.target.closest(`.${c.btn}`) ||
    e.target.closest(`.${c.wrapLabel}`) ||
    e.target.closest(`.${c.wrapStar}`)
  ) {
    return false;
  } else {
    return true;
  }
}
