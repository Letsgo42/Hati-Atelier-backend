// IMPORT MODULES
const express = require('express')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const logger = require('../tools/logger')
const asyncErrorHandler = require('../tools/asyncErrorHandler');

const BookModel = require('../models/book')
const router = express.Router()

// POST NEW BOOK // ADMIN ONLY
router.post('/', asyncErrorHandler(async (req, res, next) => {
  const book = await BookModel.create();
  res.send(book)
}))

// GET ALL BOOKS // AUTH USERS ONLY
router.get('/', asyncErrorHandler(async (req, res, next) => {
  const books = await BookModel.findAll();
  res.send(books)
}))

// GET ONE BOOK // AUTH USERS ONLY
router.get('/:id', asyncErrorHandler(async (req, res, next) => {
  const book = await BookModel.findOne();
  res.send(book)
}))

// DELETE ONE BOOK // ADMIN ONLY
router.delete('/:id', asyncErrorHandler(async (req, res, next) => {
  const book = await BookModel.findOneAndDelete();
  res.send(book)
}))


module.exports = router