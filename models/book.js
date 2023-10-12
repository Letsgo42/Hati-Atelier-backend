const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  pages: {
    type: Number
  },
  genre: {
    type: String
  },
  published: {
    type: Boolean
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Book', bookSchema)