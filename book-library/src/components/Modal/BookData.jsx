import c from './modal.module.css';

export function BookData({ book }) {
  const bookCover = book.imageLinks?.smallThumbnail;

  return (
    <>
      <h1>{book.title}</h1>
      <div className={c.wrap}>
        <div className={c.bookCover}>
          <img src={bookCover} alt={book.title} />
        </div>
        <div className={c.wrapBookMeta}>
          <table className={c.bookMeta}>
            <tbody>
              {book.authors?.length > 0 && (
                <tr>
                  <th>Author</th>
                  <td>{book.authors.join(', ').toLowerCase()}</td>
                </tr>
              )}

              {book.publisher && (
                <tr>
                  <th>Publisher</th>
                  <td>{book.publisher.toLowerCase()}</td>
                </tr>
              )}

              {book.publishedDate && (
                <tr>
                  <th>Year</th>
                  <td>{book.publishedDate}</td>
                </tr>
              )}

              {typeof book.pageCount === 'number' && book.pageCount > 0 && (
                <tr>
                  <th>Page count</th>
                  <td>{book.pageCount}</td>
                </tr>
              )}

              {book.previewLink && (
                <tr>
                  <th>Preview</th>
                  <td>
                    <a href={book.previewLink}>Open me</a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
