export function checkIgnoreModalClick(e, c) {
  // console.log(e.target, e.currentTarget);
  if (
    e.target.closest(`.${c.author}`) ||
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
