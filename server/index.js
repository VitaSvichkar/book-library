const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

const api = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1',
});

app.get('/api/books', async (req, res) => {
  const { q, startIndex, author, subject } = req.query;

  try {
    const query = [];

    if (q && q.trim()) {
      query.push(`intitle:"${q}"`);
    }
    if (author && author.trim()) {
      query.push(`inauthor:${author}`);
    }
    if (subject && subject.trim()) {
      query.push(`subject:${subject}`);
    }

    const queryStr = query.length ? query.join('+') : '';
    const response = await api.get(`/volumes`, {
      params: {
        q: queryStr,
        startIndex,
        maxResults: 12,
        printType: 'books',
        key: process.env.GOOGLE_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error while requesting Google Books API:', error.message);
    res.status(500).json({ error: 'Failed to receive books' });
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
