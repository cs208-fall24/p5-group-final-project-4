import express from 'express'
import sql from 'sqlite3'

const sqlite3 = sql.verbose()

// Create an in memory table to use
const db = new sqlite3.Database(':memory:')

// Create comments table
db.run(`CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author TEXT,
  content TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

const app = express()
app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', function (req, res) {
  console.log('GET called')
  // Get the most recent comment
  db.get('SELECT * FROM comments ORDER BY timestamp DESC LIMIT 1', [], (err, comment) => {
    if (err) {
      console.error(err)
      comment = null
    }
    res.render('student1/index', { comment })
  })
})

app.get('/student1', function (req, res) {
  console.log('GET called')
  // Get the most recent comment
  db.get('SELECT * FROM comments ORDER BY timestamp DESC LIMIT 1', [], (err, comment) => {
    if (err) {
      console.error(err)
      comment = null
    }
    res.render('student1/index', { comment })
  })
})

app.get('/student2', function (req, res) {
  console.log('GET called')
  res.render('student2')
})

app.get('/student3', function (req, res) {
  console.log('GET called')
  res.render('student3')
})

app.get('/comments', (req, res) => {
  db.all('SELECT * FROM comments ORDER BY timestamp DESC', [], (err, comments) => {
    if (err) {
      console.error(err)
      comments = []
    }
    res.render('student1/comments', { comments })
  })
})

// Add a new comment
app.post('/api/comments', (req, res) => {
  const { author, content } = req.body
  db.run('INSERT INTO comments (author, content) VALUES (?, ?)',
    [author, content],
    (err) => {
      if (err) console.error(err)
      res.redirect('/comments')
    })
})

// Start the web server
app.listen(3000, function () {
  console.log('Listening on port 3000...')
})