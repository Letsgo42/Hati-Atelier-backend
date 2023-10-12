// IMPORT MODULES
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const logger = require('./tools/logger')

// CONNECTION TO MONGODB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
}).then(() => logger.log('info', 'Connection to MongoDB successfull'))
  .catch(() => logger.error('Connection to MongoDB failed !'))

// NEW INSTANCE OF EXPRESS
const app = express()

// IMPORT MODELS
require('./models/user')
require('./models/book')

// IMPORT ROUTES
const userRouter = require('./routes/user.js')
const bookRouter = require('./routes/book.js')

// USE EXPRESS MIDDLEWARE
app.use(express.json())

app.use('/users', userRouter)
app.use('/books', bookRouter)

// CREATE SERVER
app.listen(PORT, () => {
  logger.log('info', `Server is running on http://localhost:${PORT}`)
})