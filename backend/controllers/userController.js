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
    return
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    roles: [],
  })

  if (user) {
    const token = generateToken(user._id)

    res.cookie('auth', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token,
      roles: user.roles,
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
    const token = generateToken(user._id)

    res.cookie('auth', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    res.status(200).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token,
      roles: user.roles,
    })
  } else {
    res.status(400).json({
      type: 'error',
      message: 'Nieprawidłowy adres email lub hasło!',
    })
  }
})

// Logout user
// POST /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('auth').end()
})

// Update user
// PUT /api/users/:id/update
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res
      .status(400)
      .json({ type: 'error', message: 'Nie znaleziono użytkownika!' })
    return
  }

  const data = { ...req.body, roles: [] }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, data, {
    new: true,
  })

  res.status(200).json(updatedUser)
})

// Get user
// GET /api/users/:id
const getUser = asyncHandler(async (req, res) => {
  let user

  try {
    user = await User.findById(req.params.id)
  } catch (err) {
    res
      .status(400)
      .json({ type: 'error', message: 'Nie znaleziono użytkownika!' })
    return
  }

  if (user === null) {
    res
      .status(400)
      .json({ type: 'error', message: 'Nie znaleziono użytkownika!' })
    return
  }

  res.status(200).json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })
})

// Authenticate user from cookies
// GET /api/users/whoami
const authenticateUser = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies['auth']

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      res.status(204).end()
      return
    }

    res.status(200).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token,
      roles: user.roles,
    })
  } catch (error) {
    res.status(204).end()
  }
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUser,
  authenticateUser,
}
