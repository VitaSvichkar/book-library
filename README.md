# Book-Library

<img width="1884" height="875" alt="Снимок экрана 2025-09-02 235535" src="https://github.com/user-attachments/assets/e2568620-2289-4164-8f7f-85b3f3698956" />
<img width="1778" height="899" alt="Снимок экрана 2025-09-03 010600" src="https://github.com/user-attachments/assets/265a8c4c-2b9d-4fcd-8773-13b1c58eec51" />

<img width="1290" height="822" alt="Снимок экрана 2025-09-03 011119" src="https://github.com/user-attachments/assets/25463fe6-300f-4b9c-8116-46cdb696b183" />
<img width="1624" height="873" alt="Снимок экрана 2025-09-03 011034" src="https://github.com/user-attachments/assets/9d572c02-8c77-43b8-842a-e5651c9c1eb0" />

**Book Library** is a React-based web application that allows users to browse books from the Google Books API, add them to a personal library, track reading progress, rate books, and write custom reviews.

## Live Demo

[Book-library](https://book-library-viktoriia.vercel.app/catalog)

## Technologies Used

- **React**
- **Redux Toolkit**
- **Redux Persist** (localStorage)
- **React Router**
- **Google Books API**
- **JavaScript**
- **CSS modules**

## Features

- 📖 Fetches books from the **Google Books API**
- 🔍 Search by author, category, or title
  → Clicking on an author or category on a book card triggers an automatic search by that parameter
- ⭐ Rate books using a star-based rating system
- 📘 Personal library with reading status filters:
  - Favorite
  - Read
  - Currently Reading
- 📝 Write and save **custom reviews** in a modal window
- 📊 Track reading progress with a progress bar and "Read" button
- 💾 Persistent state across sessions using **Redux Persist**
- 📄 Modal windows with detailed book information
- 🌐 Two main pages: **Catalog** and **My Library** (via React Router)

## 🧪 Getting Started Locally

A minimal Node.js server is used as a proxy to forward requests to the Google Books API.
This is required to bypass CORS restrictions and secure the API key.

**Start the client**

```
git clone https://github.com/VitaSvichkar/book-library
cd book-library
npm install
npm run dev
```

**Start the backend**

```
cd server
npm install
node index.js
```
