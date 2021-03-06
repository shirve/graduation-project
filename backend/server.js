const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDb = require('./config/db')
const port = process.env.port || 8000

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

app.use(errorHandler)

app.listen(port, () => console.log('Server started on port: ' + port))
