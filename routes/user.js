// IMPORT MODULES
const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const logger = require('../tools/logger')

const UserModel = require('../models/user')

// REGISTER NEW USER //
router.post('/register', asyncHandler(async (req, res, next) => {
  const users = await UserModel.findAll();
  res.send(users)
}))

// LOGIN USER // RETURN JWT
router.post('/login', asyncHandler(async (req, res, next) => {
  const users = await UserModel.findAll();
  res.send(users)
}))


module.exports = router