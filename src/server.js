/**
 * @author: Hector Mendez-Garcia
 * @date: 11/22/2024
 * @description: Express server setup for the Egyptology website with SQLite database
 * @version: 1.0
 */

import express from 'express'
import sql from 'sqlite3'

/** Enable verbose mode for detailed SQLite output */
const sqlite3 = sql.verbose()

/**
 * Initialize in-memory SQLite database
 * @type {sqlite3.Database}
 */
const db = new sqlite3.Database(':memory:')

/**
 * Create comments table if it doesn't exist
 * @schema {
 *   id: INTEGER PRIMARY KEY AUTOINCREMENT,
 *   author: TEXT,
 *   content: TEXT,
 *   timestamp: DATETIME DEFAULT CURRENT_TIMESTAMP
 * }
 */
db.run(`CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author TEXT,
  content TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

/**
 * Create comments table if it doesn't exist
 * @schema {
 *   id: INTEGER PRIMARY KEY AUTOINCREMENT,
 *   author: TEXT,
 *   content: TEXT,
 *   timestamp: DATETIME DEFAULT CURRENT_TIMESTAMP
 * }
 */
db.run(`CREATE TABLE IF NOT EXISTS comments3 (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author TEXT,
  content TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

/**
 * Initialize Express application and middleware
 */
const app = express()
app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/**
 * Home page route handler
 * Renders the index page with the most recent comment
 * @route GET /
 */
app.get('/', function (req, res) {
  console.log('GET called')
  db.get('SELECT * FROM comments ORDER BY timestamp DESC LIMIT 1', [], (err, comment) => {
    if (err) {
      console.error(err)
      comment = null
    }
    res.render('index', { comment })
  })
})

/**
 * Student 1's page route handler
 * Renders the index page with the most recent comment
 * @route GET /student1
 */
app.get('/student1', function (req, res) {
  console.log('GET called')
  db.get('SELECT * FROM comments ORDER BY timestamp DESC LIMIT 1', [], (err, comment) => {
    if (err) {
      console.error(err)
      comment = null
    }
    res.render('student1/index', { comment })
  })
})

/**
 * Student 2's page route handler
 * @route GET /student2
 */
app.get('/student2', function (req, res) {
  console.log('GET called')
  res.render('student2')
})

/**
 * Student 3's page route handler
 * @route GET /student3
 */
app.get('/student3', function (req, res) {
  console.log('GET called')
  db.all('SELECT * FROM comments3 ORDER BY timestamp DESC', [], (err, comments) => {
    if (err) {
      console.error(err)
      comments = []
    }
    res.render('student3/index', { comments })
  })
})

/**
 * Comments page route handler
 * Displays all comments in descending order by timestamp
 * @route GET /comments
 */
app.get('/comments3', (req, res) => {
  console.log('GET called')
  db.all('SELECT * FROM comments3 ORDER BY timestamp DESC', [], (err, comments) => {
    if (err) {
      console.error(err)
      comments = []
    }
    res.render('student3/comments', { comments })
  })
})

/**
 * Comments page route handler
 * Displays all comments in descending order by timestamp
 * @route GET /comments
 */
app.get('/comments', (req, res) => {
  db.all('SELECT * FROM comments ORDER BY timestamp DESC', [], (err, comments) => {
    if (err) {
      console.error(err)
      comments = []
    }
    res.render('student1/comments', { comments })
  })
})

/**
 * Add new comment endpoint
 * Accepts author and content in request body
 * @route POST /api/comments
 * @param {Object} req.body
 * @param {string} req.body.author - The author's name
 * @param {string} req.body.content - The comment content
 */
app.post('/api/comments', (req, res) => {
  const { author, content } = req.body
  db.run('INSERT INTO comments (author, content) VALUES (?, ?)',
    [author, content],
    (err) => {
      if (err) console.error(err)
      res.redirect('/comments')
    })
})

/**
 * Add new comment endpoint
 * Accepts author and content in request body
 * @route POST /comments3
 * @param {Object} req.body
 * @param {string} req.body.author - The author's name
 * @param {string} req.body.content - The comment content
 */
app.post('/api/comments3', (req, res) => {
  const { author, content } = req.body
  db.run('INSERT INTO comments3 (author, content) VALUES (?, ?)',
    [author, content],
    (err) => {
      if (err) console.error(err)
      res.redirect('/comments3')
    })
})

/**
 * Delete a comment from the database
 */
app.post('/api/:id/delete3', (req, res) => {
  const id = req.params.id
  db.run('DELETE FROM comments3 WHERE id = ?',
    [id],
    (err) => {
      if (err) console.error(err)
      res.redirect('/comments3')
    })
})

app.post('/api/:id/edit3', (req, res) => {
  const id = req.params.id
  const { editauthor, editcontent } = req.body
  db.run('UPDATE comments3 SET author = ?, content = ? WHERE id = ?',
    [editauthor, editcontent, id],
    (err) => {
      if (err) console.error(err)
      res.redirect('/comments3')
    })
})

/**
 * Start the Express server
 * @listens {number} 3000 - The port number
 */
app.listen(3000, function () {
  console.log('Listening on port 3000...')
})