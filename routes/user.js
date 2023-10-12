// IMPORT MODULES
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const logger = require('../tools/logger')
const asyncErrorHandler = require('../tools/asyncErrorHandler');
const bcrypt = require('bcrypt')


const UserModel = mongoose.model('User')
const router = express.Router()

// REGISTER NEW USER //
router.post('/register', asyncErrorHandler(async (req, res, next) => {
  const body = req.body

  // Hash password
  const saltRounds = 10
  let hashPassword = await bcrypt.hash(body.password, saltRounds)

  // Create user in database
  const user = await UserModel.create({
    username: body.username,
    password: hashPassword,
    role: body.role
  })
  if (!user) {
    logger.log('error', 'User not created')
    return res.status(500).json({ message: 'User not created' })
  }

  // Send logs and confirmation
  logger.log('info', 'New user created !')
  res.json(user)
}))

// LOGIN USER // RETURN JWT
router.post('/login', asyncErrorHandler(async (req, res, next) => {
  const body = req.body

  // Find user in database
  const user = await UserModel.findOne({ username: body.username })
  if (!user) {
    logger.log('error', "User not found ")
    return res.status(404).json({ message: "User not found " })
  }

  // Authenticate user
  let validPassword = await bcrypt.compare(body.password, user.password)
  if (!validPassword) {
    logger.log('error', 'Password does not match')
    return res.status(401).json({ message: 'Username or password does not match ' })
  }

  // Generate token
  const payload = { userId: user._id }
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
  if (!token) {
    logger.log('error', 'Error during token signing')
    return res.status(500).json({ message: 'Error during token signing' })
  }

  // Confirmation
  logger.log('info', 'User Id is: ' + `${user._id}` + ' with token: ' + `${token}`)
  return res.status(200).json({ userId: user._id, token: token })
}))


module.exports = router