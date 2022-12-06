const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');

class Book {
  constructor(
    id = uuidv4(),
    title = '',
    description = '',
    authors = '',
    favorite = '',
    fileCover = '',
    fileName = ''
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
}

const store = {
  books: []
};

router.get('/', (req, res) => {
  const {books} = store;
  res.json(books);
});

router.get('/:id', (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);
  if (idx !== -1) {
    res.json(books[idx])
  } else {
    res.status(404).json({message: 'Книга не найдена'});
  }
});

router.post('/', (req, res) => {
  const {books} = store;
  const {title, description, authors, favorite, fileCover, fileName} = req.body;
  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  );
  books.push(newBook);
  res.json(newBook);
});

router.put('/:id', (req, res) => {
  const {books} = store;
  const {title, description, authors, favorite, fileCover, fileName} = req.body;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);
  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName
    }
    res.json(books[idx]);
  } else {
    res.status(404).json({message: 'Книга не найдена'});
  }
});

router.delete('/:id', (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);
  if (idx !== -1) {
    books.splice(idx, 1);
    res.json({message: 'Ok'});
  } else {
    res.status(404).json({message: 'Книга не найдена'});
  }
});


module.exports = router;


