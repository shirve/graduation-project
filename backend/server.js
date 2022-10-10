const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDb = require('./config/db')
const PORT = process.env.PORT || 8000

connectDb()

const app = express()
app.use(cors())

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/uploads', express.static(path.join(__dirname, './uploads')))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/projects', require('./routes/projectRoutes'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  )
} else {
  app.get('/', (req, res) => res.status(200).json('OK'))
}

app.use(errorHandler)

app.listen(PORT, () => console.log('Server started on port: ' + PORT))
