const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//@desc Register new user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400).json({ message: 'User already exists' })
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
    res.status(400).json({ message: 'Invalid user data' })
  }
})

//@desc Authenticate a user
//@route POST /api/users/login
//@access Public
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
    res.status(400).json({ message: 'Invalid user credentials' })
  }
})

//@desc Get user data
//@route GET /api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

//@desc Get user by id
//@route GET /api/users/user/:id
//@access Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  res.status(200).json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })
})

//@desc Update user data
//@route PUT /api/users/:id
//@access Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(400).json({ message: 'User not found' })
  }

  if (user.ROLE_ADMIN === false) {
    req.body.ROLE_ADMIN = false
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedUser)
})

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  getUser,
}
