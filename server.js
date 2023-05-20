const express = require('express')
const port = 3000

const app = express()

app.use(express.json())// I need this if its an api or all my code won't work
app.use(require('cors')())

const books = []

// Get all books
app.get('/books', (req, res) => {
  res.json(books)
})

// Add a new book
app.post('/books', (req, res) => {
  books.push(req.body)
  res.status(201).json(req.body)
})

// Get a specific book
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id))
  if (!book) return res.status(404).json({ message: 'Book not found' })
  res.json(book)
})

// Update a book
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id))
  if (!book) return res.status(404).json({ message: 'Book not found' })

  Object.assign(book, req.body)
  res.json(book)
})

// Delete a book
app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ message: 'Book not found' })

  books.splice(index, 1)
  res.sendStatus(204)
})

app.listen(port, () => {
  console.log(`listening on ${port}`)
})
