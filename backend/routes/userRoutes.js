const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUser,
  authenticateUser,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const { body } = require('express-validator')
const { validate } = require('../middleware/validateMiddleware')

// Register user
// POST /api/users/register
router.post(
  '/register',
  validate([
    body('firstName').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString().isLength({ min: 6 }),
  ]),
  registerUser
)

// Login user
// POST /api/users/login
router.post(
  '/login',
  validate([
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString(),
  ]),
  loginUser
)

// Logout user
// POST /api/users/logout
router.post('/logout', logoutUser)

// Update user
// PUT /api/users
router.put('/', protect, updateUser)

// Authenticate user from cookies
// GET /api/users
router.get('/', authenticateUser)

// Get user
// GET /api/users/:id
router.get('/:id', getUser)

module.exports = router
