// IMPORT MODULES
const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const logger = require('../tools/logger')

const BookModel = require('../models/book')

// POST NEW BOOK // ADMIN ONLY
router.post('/', asyncHandler(async (req, res, next) => {
  const book = await BookModel.create();
  res.send(book)
}))

// GET ALL BOOKS // AUTH USERS ONLY
router.get('/', asyncHandler(async (req, res, next) => {
  const books = await BookModel.findAll();
  res.send(books)
}))

// GET ONE BOOK // AUTH USERS ONLY
router.get('/:id', asyncHandler(async (req, res, next) => {
  const book = await BookModel.findOne();
  res.send(book)
}))

// DELETE ONE BOOK // ADMIN ONLY
router.delete('/:id', asyncHandler(async (req, res, next) => {
  const book = await BookModel.findOneAndDelete();
  res.send(book)
}))


module.exports = router