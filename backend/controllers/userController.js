const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// Register user
// POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res
      .status(400)
      .json({ type: 'error', message: 'Podany email jest zajęty!' })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    ROLE_ADMIN: false,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
      ROLE_ADMIN: user.ROLE_ADMIN,
    })
  } else {
    res
      .status(400)
      .json({ type: 'error', message: 'Niepoprawne dane użytkownika!' })
  }
})

// Login user
// POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
      ROLE_ADMIN: user.ROLE_ADMIN,
    })
  } else {
    res.status(400).json({
      type: 'error',
      message: 'Nieprawidłowy adres email lub hasło!',
    })
  }
})

// Update user
// PUT /api/users/:id/update
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res
      .status(400)
      .json({ type: 'error', message: 'Nie znaleziono użytkownika!' })
  }

  const data = { ...req.body, ROLE_ADMIN: false }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, data, {
    new: true,
  })

  res.status(200).json(updatedUser)
})

// Get user
// GET /api/users/:id
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  res.status(200).json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getUser,
}
