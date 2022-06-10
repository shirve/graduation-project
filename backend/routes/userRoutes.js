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
    body('firstName')
      .notEmpty()
      .isString()
      .isLength({ min: 3, max: 50 })
      .matches(/^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*$/),
    body('lastName')
      .notEmpty()
      .isString()
      .isLength({ min: 3, max: 50 })
      .matches(/^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*$/),
    body('email').notEmpty().isEmail().isLength({ max: 255 }),
    body('password')
      .notEmpty()
      .isString()
      .isLength({ min: 6, max: 50 })
      .matches(
        /^(?=.*[a-ząćęłńóśźż])(?=.*[A-ZĄĆĘŁŃÓŚŹŻ])(?=.*\d)(?=.*[!@#$%^&*?])[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż\d!@#$%^&*?]{6,50}$/
      ),
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
router.put(
  '/',
  validate([
    body('firstName')
      .notEmpty()
      .isString()
      .isLength({ min: 3, max: 50 })
      .matches(/^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*$/g),
    body('lastName')
      .notEmpty()
      .isString()
      .isLength({ min: 3, max: 50 })
      .matches(/^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*$/),
    body('email').notEmpty().isEmail().isLength({ max: 255 }),
    body('github')
      .isString()
      .matches(/^https:\/\/github.com\/.+/g),
    body('technologies').isString().isLength({ max: 255 }),
  ]),
  protect,
  updateUser
)

// Authenticate user from cookies
// GET /api/users
router.get('/', authenticateUser)

// Get user
// GET /api/users/:id
router.get('/:id', getUser)

module.exports = router
