// IMPORT MODULES
const express = require('express')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const logger = require('../tools/logger')
const asyncErrorHandler = require('../tools/asyncErrorHandler');

const UserModel = require('../models/user')
const router = express.Router()

// REGISTER NEW USER //
router.post('/register', asyncErrorHandler(async (req, res, next) => {
  const users = await UserModel.findAll();
  res.send(users)
}))

// LOGIN USER // RETURN JWT
router.post('/login', asyncErrorHandler(async (req, res, next) => {
  const users = await UserModel.findAll();
  res.send(users)
}))


module.exports = router