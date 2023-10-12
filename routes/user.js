// IMPORT MODULES
const express = require('express')
const jwt = require('jsonwebtoken');
const logger = require('../tools/logger')
const asyncErrorHandler = require('../tools/asyncErrorHandler');


const UserModel = require('../models/user')
const router = express.Router()

// REGISTER NEW USER //
router.post('/register', asyncErrorHandler(async (req, res, next) => {
  const body = req.body


  const user = await UserModel.create({
    username: body.username,
    password: hashPassword
  });

  if (!user) {
    logger.warn('Error404 : User not created')
    res.status(404).send({ message: 'User not created' })
  }
  res.send(user)
}))

// LOGIN USER // RETURN JWT
router.post('/login', asyncErrorHandler(async (req, res, next) => {
  const user = await UserModel.findById();
  res.send(user)
}))


module.exports = router