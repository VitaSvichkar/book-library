export function checkIgnoreModalClick(e, c) {
  // console.log(e.target, e.currentTarget);
  if (
    e.target.closest(`.${c.author}`) ||
    e.target.closest(`.${c.categories}`) ||
    e.target.closest(`.${c.btn}`) ||
  ) {
    return false;
  } else {
    return true;
  }
}
