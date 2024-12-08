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
const dbTwo = new sqlite3.Database(':memory:')

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
 * Create Student Two's comments table if it doesn't exist
 * @schema {
 *   id: INTEGER PRIMARY KEY AUTOINCREMENT,
 *   author: TEXT,
 *   content: TEXT,
 *   timestamp: DATETIME DEFAULT CURRENT_TIMESTAMP
 * }
 */
dbTwo.run(`CREATE TABLE IF NOT EXISTS S2Comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author TEXT,
  comment TEXT,
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
 * Renders the main index page
 * @route GET /
 */
app.get('/', function (req, res) {
  console.log('GET called - Main Index')
  res.render('index')  // Just render index.pug, don't query comments
})

/**
 * Student 1's page route handler
 * @route GET /student1
 */
app.get('/student1', function (req, res) {
  console.log('GET called - Student 1')
  db.get('SELECT * FROM comments ORDER BY timestamp DESC LIMIT 1', [], (err, comment) => {
    if (err) {
      console.error(err)
      comment = null
    }
    res.render('student1/index', { comment })
  })
})

///////////////////////////
//                       //
//   Start Student Two   //
//                       //
///////////////////////////

/**
 * Student 2's page route handler
 * @route GET /student2
 */
app.get('/student2', function (req, res) {
  console.log('GET called for Student 2 - Index')
  dbTwo.all('SELECT * FROM S2Comments ORDER BY RANDOM() LIMIT 5', [], (err, studentTwoComments) => {
    if (err) {
      console.error(err)
      studentTwoComments = null
    }
    res.render('student2/index', { studentTwoComments })
  })
})

/**
 * Student 2's comment page route handler
 * @route GET /student2/comments
 */
app.get('/student2/comments', function (req, res) {
  console.log('GET called for Student 2 - Comments')
  dbTwo.all('SELECT * FROM S2Comments ORDER BY timestamp DESC', [], (err, studentTwoComments) => {
    if (err) {
      console.error(err)
      studentTwoComments = []
    }
  res.render('student2/comments/index', { studentTwoComments })
  })
})

/**
 * Add new comment
 * Accepts author and content in request body
 * @route POST /student2/comments
 * @param {Object} req.body
 * @param {string} req.body.author - The author's name
 * @param {string} req.body.content - The comment
 */
app.post('/student2/comments/add', (req, res) => {
  console.log('POST called for Student 2 - Comments - Add')
  const stmt = dbTwo.prepare('INSERT INTO S2Comments (author, comment) VALUES (?, ?)')
    stmt.run(req.body.addName, req.body.addComment)
    stmt.finalize()
    res.redirect('/student2/comments')
})

/**
 * Update Comment
 * Accepts id and content in request body
 * @route POST /student2/comments/update
 * @param {Object} req.body
 * @param {string} req.body.id - Comment's ID
 * @param {string} req.body.content - The comment
 */
app.post('/student2/comments/update', (req, res) => {
  console.log('POST called for Student 2 - Comments - Update')
  const stmt = dbTwo.prepare('UPDATE S2Comments SET author = (?) WHERE id = (?)')
  const stmt2 = dbTwo.prepare('UPDATE S2Comments SET comment = (?) WHERE id = (?)')
    stmt.run(req.body.updateName, req.body.updateID)
    stmt2.run(req.body.updateComment, req.body.updateID)
    stmt.finalize()
    stmt2.finalize()
    res.redirect('/student2/comments')
})

/**
 * Delete Comment
 * Accepts id and content in request body
 * @route POST /student2/comments/update
 * @param {Object} req.body
 * @param {string} req.body.id - Comment's ID
 * @param {string} req.body.content - The comment
 */
app.post('/student2/comments/delete', (req, res) => {
  const { id } = req.body
  dbTwo.run('DELETE FROM S2Comments WHERE id = (?)',
    [id],
    (err) => {
      if (err) console.error(err)
      res.redirect('/student2/comments')
    })
})

///////////////////////////
//                       //
//    End Student Two    //
//                       //
///////////////////////////

/**
 * Student 3's page route handler
 * @route GET /student3
 */
app.get('/student3', function (req, res) {
  console.log('GET called')
  res.render('student3')
})

app.get('/comments3', function (req, res) {
  console.log('GET called')
  res.render('comments3/comments.pug')
})

// Start the web server
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
 * Start the Express server
 * @listens {number} 3000 - The port number
 */
app.listen(3000, function () {
  console.log('Listening on port 3000...')
})