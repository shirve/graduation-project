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
    const token = generateToken({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      github: user.github,
      technologies: user.technologies,
      roles: user.roles,
    })

    res.cookie('auth', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    res.status(201).json(token)
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
    const token = generateToken({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      github: user.github,
      technologies: user.technologies,
      roles: user.roles,
    })

    res.cookie('auth', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    res.status(200).json(token)
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
// PUT /api/users
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    res
      .status(400)
      .json({ type: 'error', message: 'Nie znaleziono użytkownika!' })
    return
  }

  const data = {
    github: req.body.github,
    technologies: req.body.technologies,
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, data, {
    new: true,
  }).select('-password -__v')

  res.status(200).json(updatedUser)
})

// Get user details
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
    github: user.github,
    technologies: user.technologies,
  })
})

// Authenticate user from cookie
// GET /api/users
const authenticateUser = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies['auth']

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded._id).select('-password -__v')

    if (user) {
      res.status(200).json({ user, token })
    } else {
      res.status(204).end()
    }
  } catch (error) {
    res.status(204).end()
  }
})

// Change password
// PATCH /api/users/chpasswd
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body
  const user = await User.findById(req.user._id)

  if (!user) {
    res
      .status(400)
      .json({ type: 'error', message: 'Nie znaleziono użytkownika!' })
    return
  }

  if ((await bcrypt.compare(oldPassword, user.password)) === false) {
    res
      .status(400)
      .json({ type: 'error', message: 'Podane stare hasło jest niepoprawne!' })
    return
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(newPassword, salt)

  await User.findByIdAndUpdate(
    req.user._id,
    { password: hashedPassword },
    {
      new: true,
    }
  )

  res.status(200).json({ type: 'success', message: 'Hasło zostało zmienione!' })
})

// Generate JWT
const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
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
  changePassword,
}
