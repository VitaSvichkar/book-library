# Book-Library

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
